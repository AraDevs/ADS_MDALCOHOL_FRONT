import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { debounceTime, filter, map, pairwise, startWith } from 'rxjs/operators';
import { BillTableConfiguration } from './bill-table-configuration';

type Key = number;
type Row = number;

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [BillTableConfiguration],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnInit {
  selectedProducts = new Map<Key, Row>();
  selectedRows = new Map<Row, Key>();

  source$ = new BehaviorSubject([]);
  options = [
    { id: 1, value: 20, label: 'P1' },
    { id: 2, value: 10, label: 'P3' },
    { id: 3, value: 30, label: 'P2' },
  ];
  config = this.tableConfig.getConfiguration();

  private updateTotal$ = new Subject<any>();

  constructor(private fb: FormBuilder, private tableConfig: BillTableConfiguration) {}

  ngOnInit(): void {
    const quantity$ = this.updateTotal$.pipe(
      startWith({ value: '', row: 0, column: 'quantity' }),
      filter((result) => result.column === 'quantity'),
      debounceTime(500),
      pairwise(),
      map(([prev, current]) => {
        const reguex = /^[0-9]+$/;
        const obj = this.getTotalObj(reguex, prev, current);
        return this.updateTotal(obj);
      })
    );

    const price$ = this.updateTotal$.pipe(
      startWith({ value: '', row: 0, column: 'price' }),
      filter((result) => result.column === 'price'),
      debounceTime(500),
      pairwise(),
      map(([prev, current]) => {
        const reguex = /^[0-9]+(\.[0-9]{1,4})?$/;
        const obj = this.getTotalObj(reguex, prev, current);
        return this.updateTotal(obj);
      })
    );

    merge(quantity$, price$).subscribe((records) => this.source$.next(records));
  }

  add() {
    const product = new FormControl();
    const quantity = new FormControl(0);
    const price = new FormControl(0);

    const newRow = { product, quantity, price, total: 0 };
    const rows = this.source$.value;
    this.source$.next([...rows, newRow]);
  }

  cleanRecord(row: number) {
    this.clearCache(row);

    const records = this.source$.value.slice();
    const product = records[row].product as FormControl;
    const price = records[row].price as FormControl;

    product.setValue(null, { emitEvent: false });
    price.setValue(0);

    return records;
  }

  updateRecord(inventory: any, row: number, column: string) {
    const { id } = inventory;

    const rowHasProduct = this.selectedRows.has(row);
    if (rowHasProduct) {
      this.clearCache(row);
    }

    this.selectedProducts.set(id, row);
    this.selectedRows.set(row, id);

    const records = this.source$.value.slice();
    const control = records[row].price as FormControl;
    const quantity = records[row].quantity as FormControl;

    const price = inventory.value;

    records[row].total = price * quantity.value;
    control.setValue(price);

    return records;
  }

  updateDataSource(inventory: any, row: number, column: string) {
    const { id } = inventory;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;

    if (!rowHasProduct) {
      const records = this.updateRecord(inventory, row, column);
      this.source$.next(records);
    } else {
      const records = this.cleanRecord(row);
      this.source$.next(records);
    }
  }

  computeTotal(event: KeyboardEvent, row: number, column: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    this.updateTotal$.next({ value, row, column });
  }

  private getTotalObj(reguex: RegExp, prev: any, current: any) {
    const { value, row, column } = current;
    return { value, row, reguex, prevValue: prev.value, column };
  }

  private updateTotal(obj: any) {
    const { value, row, reguex, prevValue, column } = obj;
    const records = this.source$.value.slice();
    if (value === '') {
      records[row].total = 0;
    } else {
      const price = records[row].price as FormControl;
      if (reguex.test(value)) {
        records[row].total = parseInt(value, 10) * price.value;
      } else {
        const val =
          !reguex.test(prevValue) && (prevValue === '' || value.length === 1)
            ? 0
            : parseInt(prevValue, 10);
        const control = records[row][column] as FormControl;
        control.setValue(val);
        records[row].total = val * price.value;
      }
    }
    return records;
  }

  private clearCache(row: number) {
    const product = this.selectedRows.get(row);
    const rowToDelete = this.selectedProducts.get(product);

    this.selectedProducts.delete(product);
    this.selectedRows.delete(rowToDelete);
  }
}
