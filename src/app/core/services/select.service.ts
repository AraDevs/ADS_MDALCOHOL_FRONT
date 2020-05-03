import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as dashboardState from '@dashboard-state/index';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private store$: Store<AppState>) { }

  getDepartmentByMunicipalityId(id: number) {
    return this.store$.pipe(
      select(dashboardState.selectDepartmentByMunicipalityId, id),
      take(1)
    );
  }

  getMunicipalityById(id: number) {
    return this.store$.pipe(
      select(dashboardState.selectMunicipalityById, id),
      take(1)
    );
  }

  getSellerById(id: any) {
    return this.store$.pipe(
      select(dashboardState.selectSellersById, id),
      take(1)
    );
  }

  getProviderById(id: any) {
    return this.store$.pipe(
      select(dashboardState.selectProviderById, id),
      take(1)
    );
  }
}
