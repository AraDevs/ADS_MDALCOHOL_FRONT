import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  constructor() { }

  getProductionOrder(data: any) {
    const { productionOrder } = data;
    return {
      id: productionOrder.id,
      inventory_Id: productionOrder.inventory.name,
      quantity: productionOrder.quantity,
      start_date: productionOrder.start_date,
      end_date: productionOrder.end_date,
      exp_date: productionOrder.exp_date,
      workers: productionOrder.workers,
      hours: productionOrder.hours,
      state: !!productionOrder.state
    };
  }

  getProductionOrderDTO(productionOrder: any) {
    return {
      inventory_id: productionOrder.inventory_Id.id,
      quantity: productionOrder.quantity,
      start_date: productionOrder.start_date,
      exp_date: productionOrder.exp_date,
      workers: productionOrder.workers,
      hours: productionOrder.hours,
      state: productionOrder.state
    }
  }
}