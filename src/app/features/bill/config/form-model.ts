import { Injectable } from '@angular/core';
import { InputControlConfig } from '@core/types';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as globalState from '@state/index';
import { map } from 'rxjs/operators';

@Injectable()
export class FormModel {
  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'clientId',
        fieldType: 'Select',
        id: 'clientId',
        cssClasses: '',
        label: 'Bill.Form.Client',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(
          select(globalState.selectClientsActive),
          map((clients: any[]) => {
            return clients.map(obj => ({ ...obj, label: obj.business_name, value: obj.id }));
          })
        )
      },
      {
        key: 'bill_date',
        fieldType: 'Datepicker',
        id: 'bill_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Bill.Form.BillDate'
      },
      {
        key: 'payment_type',
        fieldType: 'Select',
        id: 'payment_type',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Bill.Form.PaymentType',
        options$: this.store$.pipe(
          select(globalState.selectPaymentType),
          map((paymentType: string[]) => {
            return paymentType.map(payment => ({ label: payment, value: payment }));
          })
        )
      },
      {
        key: 'bill_type',
        fieldType: 'Select',
        id: 'bill_type',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Bill.Form.BillType',
        options$: this.store$.pipe(
          select(globalState.selectBillType),
          map((billType: string[]) => {
            return billType.map(bill => ({ label: bill, value: bill }));
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
        label: 'Bill.Form.Perception',
        defautlValue: true
      }
    ];
  }
}
