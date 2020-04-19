import { ControlDataTableConfig } from '@shared/types';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchaseTableConfiguration {
  getConfiguration(): ControlDataTableConfig {
    return {
      displayedColumns: ['product', 'provider', 'quantity', 'price', 'total', 'actions'],
      titles: {
        provider: 'Purchase.FormTable.Provider',
        product: 'Purchase.FormTable.Product',
        quantity: 'Purchase.FormTable.Quantity',
        price: 'Purchase.FormTable.Price',
        total: 'Purchase.FormTable.Total',
        actions: 'Purchase.FormTable.Actions',
      },
      controls: {
        product: 'Select',
        provider: 'Text',
        quantity: 'Input',
        price: 'Input',
        total: 'Text',
      },
    };
  }
}
