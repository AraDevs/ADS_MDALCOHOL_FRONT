import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BillTableService {


  getRowControls() {
    const product = new FormControl(null, [Validators.required]);
    const quantity = new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]+$/)]);
    const price = new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,4})?$/),
      Validators.min(0.1),
    ]);

    return { product, quantity, price };
  }

  getTotalsObj(products: any[]) {
    return products.reduce(
      (obj: any, product: any) => ({ ...obj, [product.id]: product.price }),
      {}
    );
  }

  getControlsKey() {
    return { productKey: uuidv4(), quantityKey: uuidv4(), priceKey: uuidv4() };
  }
}
