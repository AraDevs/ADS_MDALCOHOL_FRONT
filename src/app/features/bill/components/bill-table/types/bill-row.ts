import { FormControl } from '@angular/forms';

export interface BillRow {
  product: FormControl;
  quantity: FormControl;
  price: FormControl;
  productKey: string;
  quantityKey: string;
  priceKey: string;
  total: number;
}
