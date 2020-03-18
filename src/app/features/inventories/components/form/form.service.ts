import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor() {}

  getInventory(data: any) {
    console.log(data);

    const { inventory } = data;
    return {
      id: inventory.id,
      name: inventory.name,
      description: inventory.description,
      price: inventory.price,
      stock: inventory.stock,
      type: {
        label: inventory.type,
        value: inventory.type
      },
      state: !!inventory.state
    };
  }

  getInventoryDTO(inventory: any) {
    console.log(inventory);

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

    return dto;
  }
}
