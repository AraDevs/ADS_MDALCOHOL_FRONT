import { Injectable } from '@angular/core';

@Injectable()
export class SpecialPriceFormService {
  constructor() {}

  getSpecialPriceDTO(formValues: any) {
    const { price, inventory, state, id } = formValues;
  }
}
