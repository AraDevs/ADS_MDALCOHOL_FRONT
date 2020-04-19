import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as globalState from '@state/index';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class FormModel {
  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'purchase_date',
        fieldType: 'Datepicker',
        id: 'bill_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Purchase.Form.PurchaseDate'
      },
      {
        key: 'payment_type',
        fieldType: 'Select',
        id: 'payment_type',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Purchase.Form.PaymentType',
        options$: this.store$.pipe(
          select(globalState.selectPaymentType),
          map((paymentType: string[]) => {
            return paymentType.map(payment => ({ label: payment, value: payment }));
          })
        )
      },
      {
        key: 'perception',
        fieldType: 'Checkbox',
        id: 'perception',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Purchase.Form.Perception',
        defautlValue: false
      }
    ];
  }
}
