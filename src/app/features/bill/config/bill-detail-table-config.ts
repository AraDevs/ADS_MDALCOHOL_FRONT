import { DataTableConfig } from '@shared/types';

export class BillDetailTableConfig {
  getConfiguration(): DataTableConfig {
    return {
      displayedColumns: ['product', 'quantity', 'price', 'total'],

      titles: {
        product: 'Bill.FormTable.Product',
        price: 'Bill.FormTable.Price',
        quantity: 'Bill.FormTable.Quantity',
        total: 'Bill.FormTable.Total',
      },
      keys: ['inventory.name', 'quantity', 'price', 'total'],
    };
  }
}
