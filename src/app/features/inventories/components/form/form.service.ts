import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() {}

  getInventory(data: any) {
    const { inventory, provider } = data;
    console.log(data);
    const formModel:any = {
      id: inventory.id,
      name: inventory.name,
      description: inventory.description,
      price: inventory.price,
      stock: inventory.stock,
      type: {
        label: inventory.type,
        value: inventory.type
      },
      state: !!inventory.state,
    };
    if (inventory.raw_material !== null) {
      formModel['provider'] = {
        label: provider.partner.name,
        value: provider.id
      };
    }
    return formModel;
  }

  getInventoryDTO(inventory: any) {
    const dto: any = {
      name: inventory.name,
      description: inventory.description,
      price: inventory.price,
      stock: inventory.stock,
      state: inventory.state ? 1 : 0
    };
    if (inventory.type !== null) {
      dto.type = inventory.type.value;
    }
    console.log(inventory);
    if (inventory.type !== null && inventory.type.value === 'Materia prima') {
      dto.provider_id = inventory.provider.value;
    }
    return dto;
  }
}
