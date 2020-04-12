import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BillDetailTableConfig } from '@features/bill/config/bill-detail-table-config';
import * as state from '@features/bill/state';
import { select, Store } from '@ngrx/store';
import { LoadingService } from '@shared/services';
import { AppState } from '@state/app-state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'md-bill-detail',
  template: `
    <md-data-table
      [config]="tableConfig"
      [displayUpdateIcon]="false"
      [loading$]="loadingDetail$"
      [dataSource$]="items$ | async"
    >
    </md-data-table>
  `,
  providers: [LoadingService, BillDetailTableConfig],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillDetailComponent implements OnInit {
  billDetail$: Observable<any>;
  loadingDetail$: Observable<boolean>;
  items$: Observable<any[]>;
  tableConfig = this.tableC.getConfiguration();

  constructor(
    private store$: Store<AppState>,
    private loading: LoadingService,
    private tableC: BillDetailTableConfig
  ) {}

  ngOnInit(): void {
    this.billDetail$ = this.getBillDetail();
    this.loadingDetail$ = this.getLoadingDetail();
    this.items$ = this.billDetail$.pipe(map((detail) => detail.items$));
  }

  execute(billId: number) {
    const metadata = { resource: { id: billId } };
    this.store$.dispatch(state.LOAD_BILL_DETAIL({ payload: { metadata } }));
  }

  private getLoadingDetail() {
    return this.loading.getLoading([
      state.LOAD_BILL_DETAIL,
      state.BILL_DETAIL_LOADED_SUCCESS,
      state.BILL_DETAIL_LOADED_FAIL,
    ]);
  }

  private getBillDetail() {
    return this.store$.pipe(
      select(state.selectBillDetail),
      filter((detail) => detail !== null)
    );
  }
}
