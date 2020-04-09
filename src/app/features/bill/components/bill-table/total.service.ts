import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class TotalBillService {
  public getTotal(obj: any) {
    const { row, column, records } = obj;
    const control = records[row][column] as FormControl;
    if (control.valid) {
      const isPrice = column === 'price';
      const quantity = isPrice ? records[row].quantity.value : control.value;
      const price = isPrice ? control.value : records[row].price.value;
      return parseInt(quantity, 10) * price;
    } else {
      return 0;
    }
  }
}
