import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  constructor() {}

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
