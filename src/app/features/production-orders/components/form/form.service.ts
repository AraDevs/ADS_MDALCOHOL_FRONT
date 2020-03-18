import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

  constructor() { }

  getProductionOrder(data: any) {
    const { productionOrder } = data;
    return {
      id: productionOrder.id,
      quantity: productionOrder.quantity,
      start_date: productionOrder.start_date,
      end_date: productionOrder.end_date,
      exp_date: productionOrder.exp_date,
      workers: productionOrder.workers,
      hours: productionOrder.hours,
      state: !!productionOrder.state
    }
  }
}
