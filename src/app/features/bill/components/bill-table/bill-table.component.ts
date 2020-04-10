import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, skip } from 'rxjs/operators';
import { BillTableConfiguration } from './bill-table-configuration';
import { TotalBillService } from './total.service';
import { v4 as uuidv4 } from 'uuid';

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

  form: FormGroup = new FormGroup({});
  config = this.tableConfig.getConfiguration();

  @Input() products$: Observable<any[]>;
  records$ = new BehaviorSubject([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, iva: 0, total: 0 });
  constructor(
    private total: TotalBillService,
    private tableConfig: BillTableConfiguration,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    const quantity$ = this.getUpdateTotalObservable('quantity');
    const price$ = this.getUpdateTotalObservable('price');
    merge(quantity$, price$).subscribe((records) => this.records$.next(records));

    this.products$
      .pipe(
        skip(1),
        map((products) => {
          return products.reduce(
            (obj: any, product: any) => ({ ...obj, [product.id]: product.price }),
            {}
          );
        }),
        map((productsObj) => {
          const records = this.records$.value.slice();
          return records.map((record) => {
            const product = record.product as FormControl;
            const price = record.price as FormControl;
            const quantity = record.quantity as FormControl;
            const newPrice = parseFloat(productsObj[product.value.id]);
            const total = quantity.valid ? quantity.value * newPrice : 0;
            // Update values when the products$ change
            price.setValue(newPrice);
            record.total = total;

            return record;
          });
        })
      )
      .subscribe((records) => {
        this.records$.next(records);
      });
  }

  addRow() {
    if (this.canAddMore()) {
      const controls = this.getRowControls();
      const ids = this.getControlsKey();

      this.form.addControl(ids.productKey, controls.product);
      this.form.addControl(ids.quantityKey, controls.quantity);
      this.form.addControl(ids.priceKey, controls.price);

      const newRow = { ...controls, ...ids, total: 0 };
      const rows = this.records$.value;
      this.records$.next([...rows, newRow]);
    } else {
      this.message.error('');
    }
  }

  deleteRow(row: number) {
    const records = this.records$.value.slice();
    const newRecords = records.filter((record, i) => i !== row);
    this.removeCachedProduct(row);
    this.records$.next(newRecords);
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

      this.cachingProduct(product, row);
      this.computeTotal(row, 'price');
    } else {
      const records = this.unselectProduct(row);
      this.records$.next(records);
    }
  }

  /**
   * @description If the product was selected per other row in the table, the current
   * selected product not will be selected for the user
   */
  unselectProduct(row: number) {
    this.removeCachedProduct(row);

    const records = this.records$.value.slice();
    const product = records[row].product as FormControl;
    const price = records[row].price as FormControl;

    product.setValue(null, { emitEvent: false });
    price.setValue(0);

    return records;
  }

  updatePrices() {
    const records = this.records$.value;
    console.log(records);

    records.map((r) => {
      console.log(r.product.value);
      return r;
    });
  }

  getControlKey(data: any, column: string) {
    return data[column + 'Key'];
  }

  private getUpdateTotalObservable(column: string) {
    return this.updateTotal$.pipe(
      filter((result) => result.column === column),
      debounceTime(700),
      map((res) => {
        const records = this.records$.value.slice();
        const obj = { column: res.column, row: res.row, records };
        const total = this.total.getTotal(obj);
        records[res.row].total = total.toFixed(2);
        return records;
      })
    );
  }

  private cachingProduct(product: any, row: number) {
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

  private canAddMore() {
    const records = this.records$.value;
    if (records.length === 0) {
      return true;
    }
    const last = records[records.length - 1];
    return last.product.valid && last.quantity.valid && last.price.valid;
  }

  private getRowControls() {
    const product = new FormControl(null, [Validators.required]);
    const quantity = new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]+$/)]);
    const price = new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,4})?$/),
      Validators.min(0.1),
    ]);

    return { product, quantity, price };
  }

  private getControlsKey() {
    return { productKey: uuidv4(), quantityKey: uuidv4(), priceKey: uuidv4() };
  }


}
