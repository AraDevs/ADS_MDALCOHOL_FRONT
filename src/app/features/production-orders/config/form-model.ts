import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import * as dashboardState from '@dashboard-state/index';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormModel {
  hideEndDate$ = new BehaviorSubject<boolean>(true);

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        key: 'inventoryId',
        fieldType: 'Select',
        id: 'inventoryId',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.Inventory',
        options$: this.store$.pipe(
          select(dashboardState.selectFinalMaterials),
          map((inventories: any[]) => {
            return inventories.map(obj => ({ ...obj, label: obj.name, value: obj.id}));
          }))
      },
      {
        key: 'quantity',
        fieldType: 'Input',
        type: 'text',
        id: 'quantity',
        cssClasses: '',
        validations: [Validators.required, Validators.pattern('^[0-9]*$')],
        validatorMessages: ['FormValidator.Required', 'ProductionOrders.Validator.IsNumeric'],
        validationNames: ['required', 'pattern'],
        label: 'ProductionOrders.Form.Quantity'
      },
      {
        key: 'start_date',
        fieldType: 'Datepicker',
        id: 'start_date',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'ProductionOrders.Form.StartDate'
      },
      {
        key: 'end_date',
        fieldType: 'Datepicker',
        id: 'end_date',
        cssClasses: '',
        // validations: [Validators.required],
        // validatorMessages: ['FormValidator.Required'],
        // validationNames: ['required'],
        label: 'ProductionOrders.Form.EndDate',
        hidden$: this.hideEndDate$.asObservable()
      },
      {
        key: 'exp_date',
        fieldType: 'Datepicker',
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
        validations: [Validators.required, Validators.pattern("^[1-9][0-9]*$")],
        validatorMessages: ['FormValidator.Required','ProductionOrders.Validator.IsNumeric0'],
        validationNames: ['required', 'pattern'],
        label: 'ProductionOrders.Form.Workers'
      },
      {
        key: 'hours',
        fieldType: 'Input',
        type: 'text',
        id: 'hours',
        cssClasses: '',
        validations: [Validators.required, Validators.pattern("^[1-9][0-9]*$")],
        validatorMessages: ['FormValidator.Required', 'ProductionOrders.Validator.IsNumeric0'],
        validationNames: ['required', 'pattern'],
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
