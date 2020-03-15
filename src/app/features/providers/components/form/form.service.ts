import { AppState } from '@state/app-state';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import * as globalState from '@state/index';

@Injectable()
export class FormService {
  constructor(private store$: Store<AppState>) {}

  getProvider(data: any) {
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

  getProviderDTO(provider: any) {
    return {
      seller_phone: provider.seller_phone,
      partner: {
        name: provider.name,
        address: provider.address,
        municipality_id: provider.municipality.id,
        nit: provider.nit,
        phone: provider.partner_phone,
        state: provider.state ? 1 : 0
      }
    };
  }
}
