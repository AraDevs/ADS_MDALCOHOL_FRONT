import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as globalState from '@dashboard-state/index';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

type BillState = '' | 'active' | 'deleted';

@Injectable({ providedIn: 'root' })
export class LoadBillsService {
  constructor(private store$: Store<AppState>) {}
  private billState$ = new BehaviorSubject<BillState>('');

  getBills() {
   return this.billState$.pipe(
      tap((billState) => {
        this.store$.dispatch(
          globalState.LOAD_BILLS({ payload: { metadata: { resource: { state: billState } } } })
        );
      }),
      switchMap(() => this.store$.pipe(select(globalState.selectBills)))
    );
  }

  reload() {
    this.billState$.next(this.billState$.value);
  }

  loadBills(state: BillState) {
    this.billState$.next(state);
  }
}
