import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Validators } from '@angular/forms';
import * as globalState from '@state/index';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { minLength, maxLength } from '@shared/Validator';

@Injectable()
export class FormModel {
  hideEndDate$ = new BehaviorSubject<boolean>(true);

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'inventory_Id',
        fieldType: 'Select',
        id: 'inventory_Id',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Inventory',
        options$: this.store$.pipe(
          select(globalState.selectInventories),
          map((inventories: any[]) => {
            return inventories.map(obj => ({ ...obj, label: obj.name}));
          }))
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
        type: 'date',
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
        type: 'date',
        id: 'end_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.EndDate',
        hidden$: this.hideEndDate$.asObservable()
      },
      {
        key: 'exp_date',
        fieldType: 'Input',
        type: 'date',
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
