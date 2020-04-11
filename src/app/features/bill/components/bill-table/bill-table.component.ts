import { BillRow } from './types/bill-row';
import { SubSink } from 'subsink';
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
  @Input() products$: Observable<any[]>;
  @Input() computePerception$: Observable<boolean>;
  @Input() computeIVA$: Observable<boolean>;

  private subs = new SubSink();
  private selectedProducts = new Map<Key, Row>();
  private selectedRows = new Map<Row, Key>();
  private updateTotal$ = new Subject<any>();

  form: FormGroup = new FormGroup({});
  config = this.tableConfig.getConfiguration();

  rows$ = new BehaviorSubject<BillRow[]>([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, iva: 0, total: 0 });
  constructor(
    private total: TotalBillService,
    private tableConfig: BillTableConfiguration,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    const quantityChange$ = this.subTotalWhenColumnChange('quantity');
    const priceChange$ = this.subTotalWhenColumnChange('price');
    const productsChange$ = this.updateWhenProductsChange();

    const changes$ = merge(quantityChange$, priceChange$, productsChange$);

    this.subs.sink = changes$.subscribe(({ rows, total }) => {
      console.log(total);
      console.log(rows);
      this.rows$.next(rows);
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
      const rows = this.rows$.value;
      this.rows$.next([...rows, newRow]);
    } else {
      this.message.error('');
    }
  }

  deleteRow(row: number) {
    const rows = this.getRows();
    const newrows = rows.filter((record, i) => i !== row);
    this.removeCachedProduct(row);
    this.rows$.next(newrows);
  }

  computeTotal(row: number, column: string) {
    this.updateTotal$.next({ row, column });
  }

  getSelectedProduct(product: any, row: number) {
    const { id } = product;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;
    if (!rowHasProduct) {
      const priceControl = this.rows$.value[row].price;
      priceControl.setValue(product.value);

      this.cachingProduct(product, row);
      this.computeTotal(row, 'price');
    } else {
      const rows = this.unselectProduct(row);
      this.rows$.next(rows);
    }
  }

  /**
   * @description If the product was selected per other row in the table, the current
   * selected product not will be selected for the user
   */
  unselectProduct(row: number) {
    this.removeCachedProduct(row);

    const rows = this.getRows();
    const product = rows[row].product;
    const price = rows[row].price;

    product.setValue(null, { emitEvent: false });
    price.setValue(0);

    return rows;
  }

  getControlKey(data: any, column: string) {
    return data[column + 'Key'];
  }

  private subTotalWhenColumnChange(col: string) {
    return this.updateTotal$.pipe(
      filter((result) => result.column === col),
      debounceTime(500),
      map((res) => ({ ...res, rows: this.getRows() })),
      map((res) => {
        const subTotal = this.total.getSubTotalByRow(res);
        return { subTotal, rows: res.rows, row: res.row };
      }),
      map((res) => {
        const { subTotal, rows, row } = res;
        rows[row].total = subTotal;
        return rows;
      }),
      map((rows) => ({
        total: this.total.getTotal(rows),
        rows,
      }))
    );
  }

  private updateWhenProductsChange() {
    return this.products$.pipe(
      skip(1),
      map((products) => this.getTotalsObj(products)),
      map((productsObj) => {
        const rows = this.getRows();
        return this.total.updateSubTotals(rows, productsObj);
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
    const rows = this.rows$.value;
    if (rows.length === 0) {
      return true;
    }
    const last = rows[rows.length - 1];
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

  private getTotalsObj(products: any[]) {
    return products.reduce(
      (obj: any, product: any) => ({ ...obj, [product.id]: product.price }),
      {}
    );
  }

  private getControlsKey() {
    return { productKey: uuidv4(), quantityKey: uuidv4(), priceKey: uuidv4() };
  }

  private getRows() {
    return this.rows$.value.slice();
  }
}
