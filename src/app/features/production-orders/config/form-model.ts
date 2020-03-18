import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Validators } from '@angular/forms';

@Injectable()
export class FormModel {
  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'inventoryName',
        fieldType: 'Input',
        type: 'text',
        id: 'inventoryName',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Name'
      },
      {
        key: 'quantity',
        fieldType: 'Input',
        type: 'text',
        id: 'quantity',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Quantity'
      },
      {
        key: 'start_date',
        fieldType: 'Input',
        type: 'text',
        id: 'start_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.StartDate'
      },
      {
        key: 'end_date',
        fieldType: 'Input',
        type: 'text',
        id: 'end_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.EndDate'
      },
      {
        key: 'exp_date',
        fieldType: 'Input',
        type: 'text',
        id: 'exp_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.ExpDate'
      },
      {
        key: 'workers',
        fieldType: 'Input',
        type: 'text',
        id: 'workers',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Workers'
      },
      {
        key: 'hours',
        fieldType: 'Input',
        type: 'text',
        id: 'hours',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Hours'
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        label: 'ProductionOrders.Form.State',
        defautlValue: true,
        cssClasses: ''
      }
    ];
  }
}
