import { Injectable } from '@angular/core';
import { PurchaseRow } from './types/purchase-row';

@Injectable()
export class TotalPurchaseService {
  public getTotals(subTotal: number, computePerception: boolean) {
    const perception = computePerception ? subTotal * 0.1 : 0;
    const total = subTotal + perception;
    return { subTotal, perception, total };
  }

  public getSubTotalByRow(obj: { row: number; column: string; rows: PurchaseRow[] }) {
    const { row, column, rows } = obj;
    const control = rows[row][column];
    if (control.valid) {
      const isPrice = column === 'price';
      const quantity = isPrice ? rows[row].quantity.value : control.value;
      const price = isPrice ? control.value : rows[row].price.value;
      return parseInt(quantity, 10) * parseFloat(price);
    } else {
      return 0;
    }
  }

  public getSubTotal(rows: PurchaseRow[]) {
    return rows.reduce((total: number, row: any) => {
      return (total += row.total);
    }, 0);
  }

  public updateSubTotals(rows: PurchaseRow[], productsObj: { [id: string]: number }) {
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
        obj.subTotal = obj.subTotal + subTotal;
        return obj;
      },
      { rows: [], subTotal: 0 }
    );
  }
}
