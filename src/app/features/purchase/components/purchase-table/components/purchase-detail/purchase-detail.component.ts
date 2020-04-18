import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BillDetailTableConfig } from '@features/bill/config/bill-detail-table-config';
import * as state from '@features/bill/state';
import { select, Store } from '@ngrx/store';
import { LoadingService } from '@shared/services';
import { AppState } from '@state/app-state';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'md-bill-detail',
  template: `
    <md-invoice-detail [details$]="details$"></md-invoice-detail>

    <md-data-table
      class="my-2"
      [config]="tableConfig"
      [displayUpdateIcon]="false"
      [heightAuto]="true"
      [loading$]="loading$"
      [dataSource$]="items$ | async"
    >
    </md-data-table>

    <md-invoice-detail [details$]="totals$"></md-invoice-detail>
  `,
  providers: [LoadingService, BillDetailTableConfig],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillDetailComponent implements OnInit, OnDestroy {
  details$: Observable<any>;
  totals$: Observable<any>;
  loading$: Observable<boolean>;
  items$: Observable<any[]>;
  tableConfig = this.tableC.getConfiguration();

  constructor(
    private store$: Store<AppState>,
    private loading: LoadingService,
    private tableC: BillDetailTableConfig
  ) {}

  ngOnInit(): void {
    const detail$ = this.getBillDetail();

    this.totals$ = detail$.pipe(pipe(map((result) => result.totals)));
    this.details$ = detail$.pipe(pipe(map((result) => result.details)));
    this.items$ = detail$.pipe(map((result) => result.items$));

    this.loading$ = this.getLoadingDetail();
  }

  execute(billId: number) {
    const metadata = { resource: { id: billId } };
    this.store$.dispatch(state.LOAD_BILL_DETAIL({ payload: { metadata } }));
  }

  ngOnDestroy() {
    this.store$.dispatch(state.CLEAR_BILL_DETAIL());
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
