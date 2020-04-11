import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, skip, startWith } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { BillTableConfiguration } from './bill-table-configuration';
import { BillTableService } from './bill-table.service';
import { TotalBillService } from './total.service';
import { BillRow } from './types/bill-row';

type Key = number;
type Row = number;

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [BillTableConfiguration, TotalBillService, BillTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnInit {
  @Input() products$: Observable<any[]>;
  @Input() computePerception$: Observable<boolean>;
  @Input() computeIVA$: Observable<boolean>;

  private subs = new SubSink();
  private selectedProducts = new Map<Key, Row>();
  private selectedRows = new Map<Row, Key>();
  private computeSubTotal$ = new Subject<any>();

  form: FormGroup = new FormGroup({});
  config = this.tableConfig.getConfiguration();

  rows$ = new BehaviorSubject<BillRow[]>([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, iva: 0, total: 0 });
  constructor(
    private total: TotalBillService,
    private tableConfig: BillTableConfiguration,
    private message: MessageService,
    private billTableService: BillTableService
  ) {}

  ngOnInit(): void {
    const quantityChange$ = this.computeSubTotalWhenColumnChange('quantity');
    const priceChange$ = this.computeSubTotalWhenColumnChange('price');
    const productsChange$ = this.updateRowTotalsWhenProductsChange();

    const changes$ = merge(quantityChange$, priceChange$, productsChange$);

    this.subs.sink = changes$.subscribe(({ rows, subTotal }) => {
      const totals = this.totals$.value;
      const { iva: _iva, perception: _perception } = totals;
      const iva = _iva === 0 ? 0 : subTotal * 0.13;
      const perception = _perception === 0 ? 0 : subTotal * 0.1;
      const total = subTotal + iva + perception;

      this.rows$.next(rows);
      this.totals$.next({ ...totals, subTotal, total, iva, perception });
    });

    this.subs.sink = merge(
      this.computePerception$.pipe(
        map((compute) => ({ compute, value: 0.1, key: 'perception', key2: 'iva' }))
      ),
      this.computeIVA$.pipe(
        map((compute) => ({ compute, value: 0.13, key: 'iva', key2: 'perception' }))
      )
    ).subscribe((res) => {
      const { compute, value, key, key2 } = res;
      const totals = this.totals$.value;
      const { subTotal } = totals;
      const result = compute ? subTotal * value : 0;

      const total = subTotal + result + totals[key2];
      this.totals$.next({ ...totals, [key]: result, total });
    });
  }

  addRow() {
    if (this.form.valid) {
      const controls = this.billTableService.getRowControls();
      const ids = this.billTableService.getControlsKey();

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

    const totals = this.totals$.value;
    const subTotal = this.total.getSubTotal(rows);

    this.rows$.next(newrows);
    this.totals$.next({ ...totals, subTotal });
  }

  computeSubTotal(row: number, column: string) {
    this.computeSubTotal$.next({ row, column });
  }

  getSelectedProduct(product: any, row: number) {
    const { id } = product;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;
    if (!rowHasProduct) {
      const priceControl = this.rows$.value[row].price;
      priceControl.setValue(product.value);

      this.cachingProduct(product, row);
      this.computeSubTotal(row, 'price');
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

  private computeSubTotalWhenColumnChange(col: string) {
    return this.computeSubTotal$.pipe(
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
        subTotal: this.total.getSubTotal(rows),
        rows,
      }))
    );
  }

  private updateRowTotalsWhenProductsChange() {
    return this.products$.pipe(
      skip(1),
      map((products) => this.billTableService.getTotalsObj(products)),
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

  private getRows() {
    return this.rows$.value.slice();
  }
}
