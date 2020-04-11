import { FormControl } from '@angular/forms';

export interface BillRow {
  product: FormControl;
  quantity: FormControl;
  price: FormControl;
  total: number;
}
