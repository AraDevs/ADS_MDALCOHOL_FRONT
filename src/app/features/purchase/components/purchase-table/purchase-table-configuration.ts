import { ControlDataTableConfig } from '@shared/types';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchaseTableConfiguration {
  getConfiguration(): ControlDataTableConfig {
    return {
      displayedColumns: ['provider', 'product', 'quantity', 'price', 'total', 'actions'],
      titles: {
        provider: 'Purchase.FormTable.Provider',
        product: 'Purchase.FormTable.Product',
        quantity: 'Purchase.FormTable.Quantity',
        price: 'Purchase.FormTable.Price',
        total: 'Purchase.FormTable.Total',
        actions: 'Purchase.FormTable.Actions',
      },
      controls: {
        provider: 'Select',
        product: 'Select',
        quantity: 'Input',
        price: 'Input',
        total: 'Text',
      },
    };
  }
}
