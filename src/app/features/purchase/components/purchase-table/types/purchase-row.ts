import { FormControl } from '@angular/forms';

export interface PurchaseRow {
  product: FormControl;
  quantity: FormControl;
  price: FormControl;
  provider: string;
  productKey: string;
  quantityKey: string;
  priceKey: string;
  total: number;
}
