import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as dashboardState from '@dashboard-state/index';
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
        cssClasses: 'col-sm-6',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Purchase.Form.PurchaseDate',

      },
      {
        key: 'payment_type',
        fieldType: 'Select',
        id: 'payment_type',
        cssClasses: 'col-sm-6',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Purchase.Form.PaymentType',
        options$: this.store$.pipe(
          select(dashboardState.selectPaymentType),
          map((paymentType: string[]) => {
            return paymentType.map(payment => ({ label: payment, value: payment }));
          })
        )
      },
      {
        key: 'perception',
        fieldType: 'Checkbox',
        id: 'perception',
        cssClasses: 'col-12',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Purchase.Form.Perception',
        defautlValue: false
      }
    ];
  }
}
