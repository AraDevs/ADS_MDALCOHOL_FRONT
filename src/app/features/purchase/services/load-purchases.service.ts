import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { BehaviorSubject } from 'rxjs';
import * as globalState from '@dashboard-state/index';
import { tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

type PurchaseState = '' | 'active' | 'deleted';

@Injectable({ providedIn: 'root' })
export class LoadPurchasesService {
  constructor(private store$: Store<AppState>) {}
  private puschaseState$ = new BehaviorSubject<PurchaseState>('');

  getPuschases() {
    return this.puschaseState$.pipe(
      tap((purchaseState) => {
        this.store$.dispatch(
          globalState.LOAD_PURCHASE({ payload: { metadata: { resource: { state: purchaseState } } } })
        );
      }),
      switchMap(() => this.store$.pipe(select(globalState.selectPurchases)))
    );
  }

  reload() {
    this.puschaseState$.next(this.puschaseState$.value);
  }

  loadPurchases(state: PurchaseState) {
    this.puschaseState$.next(state);
  }
}
