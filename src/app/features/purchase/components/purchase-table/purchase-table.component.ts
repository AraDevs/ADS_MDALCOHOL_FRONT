import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from '@core/services/message.service';
import { Key, Row } from '@shared/types';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { PURCHASE_TABLE_PROVIDERS } from './providers';
import { PurchaseTableConfiguration } from './purchase-table-configuration';
import { PurchaseTableService } from './purchase-table.service';
import { TotalPurchaseService } from './total.service';
import { PurchaseRow } from './types';

@Component({
  selector: 'md-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrls: ['./purchase-table.component.scss'],
  providers: [...PURCHASE_TABLE_PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseTableComponent implements OnInit {
  @Input() products$: Observable<any[]>;
  @Input() providers$: Observable<any[]>;
  @Input() computePerception$: Observable<boolean>;

  private subs = new SubSink();
  private computeSubTotal$ = new Subject<any>();
  // Relationship using for caching
  private productByRow = new Map<Key, Row>();
  private rowByProduct = new Map<Row, Key>();
  private providerByRow = new Map<Key, Row>();
  private rowByProvider = new Map<Row, Key>();

  form: FormGroup = new FormGroup({});
  config = this.tableConfig.getConfiguration();

  rows$ = new BehaviorSubject<PurchaseRow[]>([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, total: 0 });
  deleteRow$ = new Subject<{ rows: PurchaseRow[]; subTotal: number }>();

  constructor(
    private total: TotalPurchaseService,
    private tableConfig: PurchaseTableConfiguration,
    private message: MessageService,
    private purchaseTableService: PurchaseTableService
  ) {}

  ngOnInit(): void {
    const quantityChange$ = this.computeSubTotalWhenColumnChange('quantity');
    const priceChange$ = this.computeSubTotalWhenColumnChange('price');

    const changes$ = merge(this.deleteRow$, quantityChange$, priceChange$).pipe(
      switchMap((obj) => {
        return combineLatest([this.computePerception$, of(obj)]);
      })
    );

    this.subs.sink = changes$.subscribe((result) => {
      const [computePerception, { subTotal, rows }] = result;
      const totals = this.total.getTotals(subTotal, computePerception);

      this.rows$.next(rows);
      this.totals$.next(totals);
    });
  }

  addRow() {
    if (this.form.valid) {
      const controls = this.purchaseTableService.getRowControls();
      const ids = this.purchaseTableService.getControlsKey();
      this.addControls(ids, controls);

      const rows = this.rows$.value;
      const newRow = { ...controls, ...ids, total: 0 };
      this.rows$.next([...rows, newRow]);
    } else {
      this.message.error('Purchase.FormTable.Messages.AddMore');
    }
  }

  deleteRow(row: number) {
    const rows = this.getRows();
    const purchaseRow = rows[row];

    const newRows = rows.filter((r) => r.productKey !== purchaseRow.productKey);
    const subTotal = this.total.getSubTotal(newRows);

    this.removeCachedProduct(row);
    this.deleteControls(purchaseRow);
    this.deleteRow$.next({ rows: newRows, subTotal });
  }

  selectedValue(value: any, row: number, column: string) {
    const { id } = value;
    const valueByRow = this.getValueByRow(column);

    const rowHasValue = valueByRow.get(id) !== undefined;
    if (!rowHasValue) {
      if (this.isProviderColumn(column)) {
        const priceControl = this.rows$.value[row].price;
        priceControl.setValue(value.value);
        this.computeSubTotal(row, 'price');
      }
      this.cachingValue(value, row, column);
    } else {
      const message = `Purchase.FormTable.Messages.Selected${
        this.isProviderColumn(column) ? 'Provider' : 'Product'
      }`;
      this.message.error(message);
      const rows = this.unselectValue(row, column);
      this.rows$.next(rows);
    }
  }

  computeSubTotal(row: number, column: string) {
    this.computeSubTotal$.next({ row, column });
  }

  /**
   * @description If the value was selected per other row in the table, the current
   * selected product not will be selected for the user
   */
  unselectValue(row: number, column: string) {
    this.removeCachedProduct(row);

    const rows = this.getRows();
    const selectControl = rows[row][column];
    selectControl.setValue(null, { emitEvent: false });

    if (!this.isProviderColumn(column)) {
      const price = rows[row].price;
      price.setValue(0);
    }

    return rows;
  }

  getControlKey(data: any, column: string) {
    return data[column + 'Key'];
  }

  getSelectData(column: string) {
    if (column === 'provider') {
      return this.providers$;
    }
    return this.products$;
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
      this.message.error('Purchase.FormTable.Messages.Save');
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

  private cachingValue(value: any, row: number, column: string) {
    const { id } = value;
    const valueByRow = this.getValueByRow(column);
    const rowByValue = this.getRowByValue(column);

    const prevValueId = valueByRow.get(row);

    if (prevValueId) {
      this.productByRow.delete(prevValueId);
    }

    valueByRow.set(id, row);
    rowByValue.set(row, id);
  }

  private removeCachedProduct(row: number) {
    const product = this.rowByProduct.get(row);
    const rowToDelete = this.productByRow.get(product);

    this.productByRow.delete(product);
    this.rowByProduct.delete(rowToDelete);
  }

  private addControls(ids: any, controls: any) {
    this.form.addControl(ids.productKey, controls.product);
    this.form.addControl(ids.quantityKey, controls.quantity);
    this.form.addControl(ids.priceKey, controls.price);
    this.form.addControl(ids.providerKey, controls.provider);
  }

  private deleteControls(row: PurchaseRow) {
    this.form.removeControl(row.productKey);
    this.form.removeControl(row.quantityKey);
    this.form.removeControl(row.priceKey);
    this.form.removeControl(row.providerKey);
  }

  private isProviderColumn(column: string) {
    return column === 'provider';
  }

  private getValueByRow(column: string) {
    return this.isProviderColumn(column) ? this.providerByRow : this.productByRow;
  }

  private getRowByValue(column: string) {
    return this.isProviderColumn(column) ? this.rowByProvider : this.rowByProduct;
  }

  private getRows() {
    return this.rows$.value.slice();
  }
}
