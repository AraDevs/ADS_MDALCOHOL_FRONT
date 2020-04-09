import { ControlDataTableConfig } from '@shared/types';
import { Injectable } from '@angular/core';

@Injectable()
export class BillTableConfiguration {
  getConfiguration(): ControlDataTableConfig {
    return {
      displayedColumns: ['product', 'quantity', 'price', 'total', 'actions'],
      titles: {
        product: 'Bill.FormTable.Product',
        quantity: 'Bill.FormTable.Quantity',
        price: 'Bill.FormTable.Price',
        total: 'Bill.FormTable.Total',
        actions: 'Bill.FormTable.Actions',
      },
      controls: {
        product: 'Select',
        quantity: 'Input',
        price: 'Input',
        total: 'Text',
      },
    };
  }
}
