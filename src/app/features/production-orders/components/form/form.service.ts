import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FormService {

  constructor() { }

  getProductionOrder(data: any) {
    const { productionOrder } = data;
    return {
      id: productionOrder.id,
      inventoryId: {
        value: productionOrder.inventory.id,
        label: productionOrder.inventory.name,
      },
      invetoryId: productionOrder.inventory.name,
      quantity: productionOrder.quantity,
      start_date: moment(productionOrder.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      end_date: productionOrder.end_date,
      exp_date: moment(productionOrder.exp_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      workers: productionOrder.workers,
      hours: productionOrder.hours,
      state: !!productionOrder.state
    };
  }

  getProductionOrderDTO(productionOrder: any) {
    return {
      inventory_id: productionOrder.inventoryId.value,
      quantity: productionOrder.quantity,
      start_date: moment(productionOrder.start_date).format('DD/MM/YYYY'),
      exp_date: moment(productionOrder.exp_date).format('DD/MM/YYYY'),
      workers: productionOrder.workers,
      hours: productionOrder.hours,
      state: productionOrder.state
    }
  }
}
