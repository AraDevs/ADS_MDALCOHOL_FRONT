import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Validators } from '@angular/forms';
import * as dashboardState from '@dashboard-state/index';
import { minLength, maxLength } from '@shared/Validator';

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
        validations: [Validators.required, minLength(4), maxLength(100)],
        validatorMessages: ['FormValidator.Required', 'Providers.Validator.MinLength', 'Providers.Validator.MaxLengthName'],
        validationNames: ['required', 'min', 'max'],
        label: 'Providers.Form.Name'
      },
      {
        key: 'address',
        fieldType: 'Textarea',
        id: 'address',
        type: 'text',
        label: 'Providers.Form.Address',
        cssClasses: '',
        validations: [Validators.required, minLength(4), maxLength(1000)],
        validatorMessages: ['FormValidator.Required', 'Providers.Validator.MinLength', 'Providers.Validator.MaxLengthAddress'],
        validationNames: ['required', 'min', 'max']
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
        options$: this.store$.pipe(select(dashboardState.selectDepartments))
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
        options$: this.store$.pipe(select(dashboardState.selectMunicipalities))
      },
      {
        key: 'nit',
        fieldType: 'Input',
        id: 'nit',
        type: 'text',
        label: 'Providers.Form.Nit',
        cssClasses: '',
        validations: [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]$')],
        validatorMessages: ['FormValidator.Required', 'Providers.Validator.IsNit'],
        validationNames: ['required', 'pattern']
      },
      {
        key: 'partner_phone',
        fieldType: 'Input',
        id: 'partner_phone',
        type: 'text',
        label: 'Providers.Form.PartnerPhone',
        cssClasses: '',
        validations: [Validators.required, minLength(8), Validators.pattern('^[0-9]{8}$')],
        validatorMessages: ['FormValidator.Required', 'Providers.Validator.MinLength', 'Providers.Validator.IsNumeric'],
        validationNames: ['required', 'min', 'pattern']
      },
      {
        key: 'seller_phone',
        fieldType: 'Input',
        id: 'seller_phone',
        type: 'text',
        label: 'Providers.Form.SellerPhone',
        cssClasses: '',
        validations: [Validators.required, minLength(8), Validators.pattern('^[0-9]{8}$')],
        validatorMessages: ['FormValidator.Required', 'Providers.Validator.MinLength', 'Providers.Validator.IsNumeric'],
        validationNames: ['required', 'min', 'pattern']
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
