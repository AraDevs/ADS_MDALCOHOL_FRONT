import { DataTableConfig } from '@shared/types';

export class PurchaseDetailTableConfig {
  getConfiguration(): DataTableConfig {
    return {
      displayedColumns: ['product', 'quantity', 'price', 'total'],

      titles: {
        product: 'Purchase.FormTable.Product',
        price: 'Purchase.FormTable.Price',
        quantity: 'Purchase.FormTable.Quantity',
        total: 'Purchase.FormTable.Total',
      },
      keys: ['inventory.name', 'quantity', 'price', 'total'],
    };
  }
}
