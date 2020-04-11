import { BillRow } from './types/bill-row';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class TotalBillService {
  public getSubTotal(obj: any) {
    const { row, column, rows } = obj;
    const control = rows[row][column] as FormControl;
    if (control.valid) {
      const isPrice = column === 'price';
      const quantity = isPrice ? rows[row].quantity.value : control.value;
      const price = isPrice ? control.value : rows[row].price.value;
      return parseInt(quantity, 10) * parseFloat(price);
    } else {
      return 0;
    }
  }

  public updateSubTotals(rows: BillRow[], productsObj: { [id: string]: number }) {
    return rows.reduce(
      (obj: any, record) => {
        const product = record.product;
        const quantity = record.quantity;
        let subTotal = 0;

        if (product.valid && quantity.valid) {
          const price = record.price;
          const newPrice = productsObj[product.value.id];

          price.setValue(newPrice);
          subTotal = parseInt(quantity.value, 10) * newPrice;
          record.total = subTotal;
        }

        obj.rows = [...obj.rows, record];
        obj.total = obj.total + subTotal;
        return obj;
      },
      { rows: [], total: 0 }
    );
  }
}
