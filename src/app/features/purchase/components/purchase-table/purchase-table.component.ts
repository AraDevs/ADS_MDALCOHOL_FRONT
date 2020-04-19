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
  @Input() computePerception$: Observable<boolean>;

  private subs = new SubSink();
  private computeSubTotal$ = new Subject<any>();
  // Relationship using for caching
  private productByRow = new Map<Key, Row>();
  private rowByProduct = new Map<Row, Key>();

  form: FormGroup = new FormGroup({});
  config = this.tableConfig.getConfiguration();
  totalTitles = this.purchaseTableService.getTotalTitles();

  rows$ = new BehaviorSubject<PurchaseRow[]>([]);
  totals$ = new BehaviorSubject({ subTotal: 0, perception: 0, total: 0 });
  totalsValue$ = this.totals$.pipe(
    map((totals) => {
      const keys = ['subTotal', 'perception', 'total'];
      return keys.map((key) => totals[key]);
    })
  );
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
      const newRow = { ...controls, ...ids, provider: '', total: 0 };
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

  selectedValue(value: any, row: number) {
    const { id } = value;

    const rowHasValue = this.productByRow.get(id) !== undefined;
    if (!rowHasValue) {
      const priceControl = this.rows$.value[row].price;
      priceControl.setValue(value.value);
      this.computeSubTotal(row, 'price');

      this.cachingValue(value, row);
    } else {
      this.message.error('Purchase.FormTable.Messages.SelectedProduct');
      const rows = this.unselectValue(row);
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
  unselectValue(row: number) {
    this.removeCachedProduct(row);

    const rows = this.getRows();
    const selectControl = rows[row].product;
    selectControl.setValue(null, { emitEvent: false });

    const price = rows[row].price;
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
        const product = rows[row].product.value;

        rows[row].total = subTotal;
        rows[row].provider = product.raw_material?.provider.partner.name;

        return rows;
      }),
      map((rows) => ({
        subTotal: this.total.getSubTotal(rows),
        rows,
      }))
    );
  }

  private cachingValue(value: any, row: number) {
    const { id } = value;

    const prevValueId = this.productByRow.get(row);

    if (prevValueId) {
      this.productByRow.delete(prevValueId);
    }

    this.productByRow.set(id, row);
    this.productByRow.set(row, id);
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
  }

  private deleteControls(row: PurchaseRow) {
    this.form.removeControl(row.productKey);
    this.form.removeControl(row.quantityKey);
    this.form.removeControl(row.priceKey);
  }

  private getRows() {
    return this.rows$.value.slice();
  }
}
