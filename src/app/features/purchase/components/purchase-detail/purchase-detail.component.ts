import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseDetailTableConfig } from '@features/purchase/config/purchase-detail-table-config';
import * as state from '@features/purchase/state';
import { select, Store } from '@ngrx/store';
import { LoadingService } from '@shared/services';
import { AppState } from '@state/app-state';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'md-purchase-detail',
  template: `
    <!-- <md-invoice-detail [details$]="details$"></md-invoice-detail>

    <md-data-table
      class="my-2"
      [config]="tableConfig"
      [displayUpdateIcon]="false"
      [heightAuto]="true"
      [loading$]="loading$"
      [dataSource$]="items$ | async"
    >
    </md-data-table>

    <md-invoice-detail [details$]="totals$"></md-invoice-detail> -->
  `,
  providers: [LoadingService, PurchaseDetailTableConfig],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseDetailComponent implements OnInit, OnDestroy {
  details$: Observable<any>;
  totals$: Observable<any>;
  loading$: Observable<boolean>;
  items$: Observable<any[]>;
  tableConfig = this.tableC.getConfiguration();

  constructor(
    private store$: Store<AppState>,
    private loading: LoadingService,
    private tableC: PurchaseDetailTableConfig
  ) {}

  ngOnInit(): void {
    const detail$ = this.getPurchaseDetail();

    // this.totals$ = detail$.pipe(pipe(map((result) => result.totals)));
    // this.details$ = detail$.pipe(pipe(map((result) => result.details)));
    // this.items$ = detail$.pipe(map((result) => result.items$));

    // this.loading$ = this.getLoadingDetail();
  }

  execute(purchaseId: number) {
    const metadata = { resource: { id: purchaseId } };
    this.store$.dispatch(state.LOAD_PURCHASE_DETAIL({ payload: { metadata } }));
  }

  ngOnDestroy() {
    this.store$.dispatch(state.CLEAR_PURCHASE_DETAIL());
  }

  private getLoadingDetail() {
    return this.loading.getLoading([
      state.LOAD_PURCHASE_DETAIL,
      state.PURCHASE_DETAIL_LOADED_SUCCESS,
      state.PURCHASE_DETAIL_LOADED_FAIL,
    ]);
  }

  private getPurchaseDetail() {
    return this.store$.pipe(
      select(state.selectPurchaseDetail),
      filter((detail) => detail !== null)
    );
  }
}
