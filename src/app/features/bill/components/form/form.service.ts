import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FormService {
  constructor() {}

  getBill(data: any) {
    const { bill, client } = data;
    return {
        id: bill.id,
        clientId: {
          value: bill.client.id,
          label: bill.client.business_name
        },
        bill_date: moment(bill.bill_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        payment_type: {
          label: bill.payment_type,
          value: bill.payment_type
        },
        bill_type: {
          label: bill.bill_type,
          value: bill.bill_type
        },
        perception: bill.perception
    };
  }

  getBillDTO(bill: any) {
    return {
      client_id: bill.clientId.id,
      bill_date: moment(bill.bill_date).format('DD/MM/YYYY'),
      payment_type: bill.payment_type.value,
      bill_type: bill.bill_type.value,
      perception: bill.perception,
      bill_item: [
        {
          inventory_id: 1,
          price: 1.99,
          quantity: 5
        }
      ]
    }
  }
}
