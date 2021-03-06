import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { Key, Row } from '@shared/types';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, skip, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { BillTableConfiguration } from './bill-table-configuration';
import { BillTableService } from './bill-table.service';
import { BILL_TABLE_PROVIDERS } from './providers';
import { TotalBillService } from './total.service';
import { BillRow } from './types';

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [...BILL_TABLE_PROVIDERS],
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
  totalTitles = this.billTableService.getTotalTitles();

  rows$ = new BehaviorSubject<BillRow[]>([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, iva: 0, total: 0 });
  totalsValue$ = this.totals$.pipe(
    map((totals) => {
      const keys = ['subTotal', 'perception', 'iva', 'total'];
      return keys.map((key) => totals[key]);
    })
  );

  deleteRow$ = new Subject<{ rows: BillRow[]; subTotal: number }>();

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

    const changes$ = merge(this.deleteRow$, quantityChange$, priceChange$, productsChange$).pipe(
      switchMap((obj) => {
        return combineLatest([this.computeIVA$, this.computePerception$, of(obj)]);
      })
    );

    this.subs.sink = changes$.subscribe((result) => {
      const [computeIva, computePerception, { subTotal, rows }] = result;
      const totals = this.total.getTotals(subTotal, computeIva, computePerception);

      this.rows$.next(rows);
      this.totals$.next(totals);
    });
  }

  addRow() {
    if (this.form.valid) {
      const controls = this.billTableService.getRowControls();
      const ids = this.billTableService.getControlsKey();
      this.addControls(ids, controls);

      const rows = this.rows$.value;
      const newRow = { ...controls, ...ids, total: 0 };
      this.rows$.next([...rows, newRow]);
    } else {
      this.message.error('Bill.FormTable.Messages.AddMore');
    }
  }

  deleteRow(row: number) {
    const rows = this.getRows();
    const billRow = rows[row];

    const newRows = rows.filter((r) => r.productKey !== billRow.productKey);
    const subTotal = this.total.getSubTotal(newRows);

    this.removeCachedProduct(row);
    this.deleteControls(billRow);
    this.deleteRow$.next({ rows: newRows, subTotal });
  }

  selectedProduct(product: any, row: number) {
    const { id } = product;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;
    if (!rowHasProduct) {
      const priceControl = this.rows$.value[row].price;
      priceControl.setValue(product.value);

      this.cachingProduct(product, row);
      this.computeSubTotal(row, 'price');
    } else {
      this.message.error('Bill.FormTable.Messages.SelectedProduct');
      const rows = this.unselectProduct(row);
      this.rows$.next(rows);
    }
  }

  computeSubTotal(row: number, column: string) {
    this.computeSubTotal$.next({ row, column });
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

  getValues() {
    const rows = this.rows$.value;

    if (this.form.valid && rows.length > 0) {
      return rows.map((row) => {
        const productId = row.product.value.id;
        const quantity = row.quantity.value;
        const price = parseFloat(row.price.value);
        return { inventory_id: productId, price, quantity };
      });
    } else {
      this.message.error('Bill.FormTable.Messages.Save');
      return [];
    }
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
    const prevProductId = this.selectedRows.get(row);

    if (prevProductId) {
      this.selectedProducts.delete(prevProductId);
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

  private addControls(ids: any, controls: any) {
    this.form.addControl(ids.productKey, controls.product);
    this.form.addControl(ids.quantityKey, controls.quantity);
    this.form.addControl(ids.priceKey, controls.price);
  }

  private deleteControls(row: BillRow) {
    this.form.removeControl(row.productKey);
    this.form.removeControl(row.quantityKey);
    this.form.removeControl(row.priceKey);
  }

  private getRows() {
    return this.rows$.value.slice();
  }
}
