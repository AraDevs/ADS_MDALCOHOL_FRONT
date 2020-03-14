import { AppState } from '@state/app-state';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as globalState from '@state/index';

@Injectable()
export class ProvidersService {
  constructor(private store$: Store<AppState>) {}

  getFormData(data: any) {
    const { provider, department, municipality } = data;
    return {
      department: { id: department.id, name: department.name, label: department.name },
      municipality,
      seller_phone: provider.seller_phone,
      name: provider.partner.name,
      address: provider.partner.address,
      nit: provider.partner.nit,
      partner_phone: provider.partner.phone,
      state: !!provider.partner.state
    };
  }

  getDepartment(provider: any) {
    return this.store$.pipe(
      select(globalState.selectDepartmentByMunicipalityId, provider.partner.municipality_id),
      take(1)
    );
  }

  getMunicipality(provider: any) {
    return this.store$.pipe(
      select(globalState.selectMunicipalityById, provider.partner.municipality_id),
      take(1)
    );
  }
}
