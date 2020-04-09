import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime, filter, map, pairwise, startWith } from 'rxjs/operators';
import { BillTableConfiguration } from './bill-table-configuration';
import { TotalBillService } from './total.service';

type Key = number;
type Row = number;

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [BillTableConfiguration, TotalBillService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnInit {
  private selectedProducts = new Map<Key, Row>();
  private selectedRows = new Map<Row, Key>();
  private updateTotal$ = new Subject<any>();

  records$ = new BehaviorSubject([]);
  options = [
    { id: 1, value: 20, label: 'P1' },
    { id: 2, value: 10, label: 'P3' },
    { id: 3, value: 30, label: 'P2' },
  ];
  config = this.tableConfig.getConfiguration();

  constructor(private total: TotalBillService, private tableConfig: BillTableConfiguration) {}

  ngOnInit(): void {
    const quantity$ = this.getUpdateTotalObservable('quantity');
    const price$ = this.getUpdateTotalObservable('price');

    merge(quantity$, price$).subscribe((records) => this.records$.next(records));
  }

  add() {
    const product = new FormControl(Validators.required);
    const quantity = new FormControl(0, [Validators.required, Validators.pattern(/^[0-9]+$/)]);
    const price = new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,4})?$/),
    ]);

    const newRow = { product, quantity, price, total: 0 };
    const rows = this.records$.value;
    this.records$.next([...rows, newRow]);
  }

  computeTotal(row: number, column: string) {
    this.updateTotal$.next({ row, column });
  }

  getSelectedProduct(product: any, row: number) {
    const { id } = product;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;

    if (!rowHasProduct) {
      const priceControl = this.records$.value[row].price as FormControl;
      priceControl.setValue(product.value);

      this.storeProduct(product, row);

      this.computeTotal(row, 'price');
    } else {
      const records = this.unselectProduct(row);
      this.records$.next(records);
    }
  }

  unselectProduct(row: number) {
    this.removeCachedProduct(row);

    const records = this.records$.value.slice();
    const product = records[row].product as FormControl;
    const price = records[row].price as FormControl;

    product.setValue(null, { emitEvent: false });
    price.setValue(0);

    return records;
  }

  private getUpdateTotalObservable(column: string) {
    return this.updateTotal$.pipe(
      filter((result) => result.column === column),
      debounceTime(700),
      map((res) => {
        const records = this.records$.value.slice();
        const obj = { column: res.column, row: res.row, records };
        const total = this.total.getTotal(obj);
        records[res.row].total = total;
        return records;
      })
    );
  }

  private storeProduct(product: any, row: number) {
    const { id } = product;

    const rowHasProduct = this.selectedRows.has(row);
    if (rowHasProduct) {
      this.removeCachedProduct(row);
    }

    this.selectedProducts.set(id, row);
    this.selectedRows.set(row, id);
  }

  private removeCachedProduct(row: number) {
    const product = this.selectedRows.get(row);
    const rowToDelete = this.selectedProducts.get(product);

    this.selectedProducts.delete(product);
    this.selectedRows.delete(rowToDelete);
  }
}
