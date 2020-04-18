import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

type BillState = '' | 'active' | 'deleted';

@Injectable({ providedIn: 'root' })
export class LoaddBillsService {
  constructor(private store$: Store<AppState>) {}
  private billState$ = new BehaviorSubject<BillState>('');

  getBills(obs: Observable<BillState>) {
    const emitter$ = obs.pipe(
      tap((state) => this.billState$.next(state)),
      switchMap(() => this.billState$.asObservable())
    );

    return emitter$.pipe(
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
