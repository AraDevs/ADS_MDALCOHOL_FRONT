import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputControlConfig } from '@core/types';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { select, Store } from '@ngrx/store';
import * as globalState from '@state/index';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpecialPriceFormModel {
  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      {
        // client
        key: 'client',
        fieldType: 'Input',
        type: 'text',
        id: 'client',
        cssClasses: '',
        label: 'Clients.Form.BusinessName'
      },
      {
        key: 'inventory',
        fieldType: 'Select',
        id: 'inventory',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Clients.PriceForm.Inventory',
        options$: this.store$.pipe(
          select(globalState.selectInventories),
          map((inventories: any[]) => {
            return inventories.map(inventory => ({ label: inventory.name, value: inventory.id }));
          })
        )
      },
      {
        key: 'price',
        fieldType: 'Input',
        type: 'text',
        id: 'price',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.PriceForm.Price'
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Clients.PriceForm.State',
        defautlValue: true
      }
    ];
  }
}
