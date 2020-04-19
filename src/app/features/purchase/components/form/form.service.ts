import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
  constructor() {}

  getPurchase(data: any) {
    const { purchase } = data;
    return {
      id: purchase.id,
      purchase_date: moment(purchase.purchase_date, 'DD/MM/YYYY').format(
        'YYYY-MM-DD'
      ),
      payment_type: {
        label: purchase.payment_type,
        value: purchase.payment_type,
      },
      perception: purchase.perception,
    };
  }

  getPurchaseDTO(purchase: any) {
    return {
      purchase_date: moment(purchase.purchase_date).format('DD/MM/YYYY'),
      payment_type: purchase.payment_type.value,
      perception: purchase.perception ? 1 : 0,
      purchase_item: [
        {
          inventory_id: 27,
          price: 0.99,
          quantity: 5
        }
      ]
    };
  }
}
