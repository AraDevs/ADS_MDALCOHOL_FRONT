import { Injectable } from '@angular/core';
import { BillRow } from './types/bill-row';

@Injectable()
export class TotalBillService {
  public getTotals(subTotal: number, computeIva: boolean, computePerception: boolean) {
    const iva = computeIva ? subTotal * 0.13 : 0;
    const perception = computePerception ? subTotal * 0.1 : 0;
    const total = subTotal + iva + perception;
    return { subTotal, iva, perception, total };
  }

  public getSubTotalByRow(obj: { row: number; column: string; rows: BillRow[] }) {
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

  public getSubTotal(rows: BillRow[]) {
    return rows.reduce((total: number, row: any) => {
      return (total += row.total);
    }, 0);
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
        obj.subTotal = obj.subTotal + subTotal;
        return obj;
      },
      { rows: [], subTotal: 0 }
    );
  }
}
