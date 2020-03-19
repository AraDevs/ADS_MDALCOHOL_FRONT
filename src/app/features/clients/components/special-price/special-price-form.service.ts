import { Injectable } from '@angular/core';

@Injectable()
export class SpecialPriceFormService {
  constructor() {}

  getSpecialPriceDTO(formValues: any) {
    const { price, inventory, state, id } = formValues;
    return {
      inventory_id: inventory.value,
      price,
      state: state ? 1 : 0,
      client_id: id
    };
  }

  getSpecialPrice(speacialPrice: any) {
    const { client, inventory, price, state } = speacialPrice;

    return {
      client: client.business_name,
      inventory: { label: inventory.name, value: inventory.id },
      price,
      state: state === 1
    };
  }
}
