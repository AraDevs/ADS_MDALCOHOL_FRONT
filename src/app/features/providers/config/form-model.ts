import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Validators } from '@angular/forms';
import * as globalState from '@state/index';

@Injectable()
export class FormModel {

  constructor(private store$: Store<any>) {}

  getModel(): Partial<InputControlConfig | SelectControlConfig>[] {
    return [
      // partner
      {
        key: 'name',
        fieldType: 'Input',
        type: 'text',
        id: 'name',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Providers.Form.Name'
      },
      {
        key: 'address',
        fieldType: 'Input',
        id: 'address',
        type: 'text',
        label: 'Providers.Form.Address',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required']
      },
      {
        key: 'department',
        fieldType: 'Select',
        id: 'department',
        cssClasses: '',
        label: 'Providers.Form.Deparment',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(select(globalState.selectDepartments))
      },
      {
        key: 'municipality',
        fieldType: 'Select',
        id: 'municipality',
        cssClasses: '',
        label: 'Providers.Form.Municipality',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.store$.pipe(select(globalState.selectMunicipalities))
      },
      {
        key: 'nit',
        fieldType: 'Input',
        id: 'nit',
        type: 'text',
        label: 'Providers.Form.Nit',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required']
      },
      {
        key: 'partner_phone',
        fieldType: 'Input',
        id: 'partner_phone',
        type: 'text',
        label: 'Providers.Form.PartnerPhone',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required']
      },
      {
        key: 'seller_phone',
        fieldType: 'Input',
        id: 'seller_phone',
        type: 'text',
        label: 'Providers.Form.SellerPhone',
        cssClasses: '',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required']
      },
      {
        key: 'state',
        fieldType: 'Checkbox',
        id: 'state',
        label: 'Providers.Form.State',
        defautlValue: true,
        cssClasses: ''
      }
    ];
  }
}
