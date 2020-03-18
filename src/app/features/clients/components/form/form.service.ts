import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';

@Injectable()
export class FormService {

  constructor(private store$: Store<AppState>) { }

  getClient(data: any) {
    const { client, seller, department, municipality } = data;
    return {
      id: client.id,
      departmentId: {id: department.id, name: department.name, label: department.name},
      municipality,
      businessName: client.business_name,
      dui: client.dui,
      registry: client.registry_no,
      personType: {
        label: client.person_type,
        value: client.person_type
      },
      seller: {
        ...seller, label: seller.name, value: seller.id
      },
      sellerName: client.seller.name,
      address: client.partner.address,
      nit: client.partner.nit,
      phone: client.partner.phone,
      state: !!client.partner.state
    };
  }

  getClientDTO(client: any) {
    return {
      business_name: client.businessName,
      dui: client.dui,
      registry_no: client.registry,
      person_type: client.personType.value,
      seller_id: client.seller.id,
      partner: {
        name: client.sellerName,
        address: client.address,
        municipality_id: client.municipality.id,
        nit: client.nit,
        phone: client.phone,
        state: client.state ? 1 : 0
      }
    };
  }
}
