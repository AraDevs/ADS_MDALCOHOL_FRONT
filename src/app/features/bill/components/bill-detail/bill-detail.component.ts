import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
    <mat-list *ngIf="details$ | async as details" class="mb-4">
      <ng-container *ngFor="let detail of details">
        <mat-list-item>
          <div class="d-flex justify-content-between w-100">
            <span class="title">{{ detail.title | transloco }}</span>
            {{ detail.value }}
          </div>
        </mat-list-item>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>

    <md-data-table
      [config]="tableConfig"
      [displayUpdateIcon]="false"
      [loading$]="loading$"
      [dataSource$]="items$ | async"
    >
    </md-data-table>
  `,
  providers: [LoadingService, BillDetailTableConfig],
  styles: [
    `
      .title {
        color: #3f51b5;
      }

      .total {
        font-size: 24px;
        color: #3f51b5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillDetailComponent implements OnInit {
  details$: Observable<any>;
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

    this.details$ = detail$.pipe(pipe(map((result) => result.details)));
    this.items$ = detail$.pipe(map((result) => result.items$));
    this.loading$ = this.getLoadingDetail();
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
