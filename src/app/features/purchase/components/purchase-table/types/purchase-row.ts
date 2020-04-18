import { FormControl } from '@angular/forms';

export interface PurchaseRow {
  product: FormControl;
  provider: FormControl;
  quantity: FormControl;
  price: FormControl;
  productKey: string;
  quantityKey: string;
  priceKey: string;
  providerKey: string;
  total: number;
}
