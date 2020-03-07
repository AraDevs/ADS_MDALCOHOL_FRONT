import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputFieldConfig, SelectFieldConfig } from '@core/types';

@Injectable()
export class LoginFormConfig {
  get fields(): Partial<InputFieldConfig | SelectFieldConfig>[] {
    return [
      {
        key: 'email',
        placeholder: 'Users.Form.User',
        label: 'Users.Form.User',
        fieldType: 'Input',
        type: 'text',
        id: 'email',
        validations: [Validators.required, Validators.email],
        validatorMessages: ['Users.FormValidator.User.Required', 'Users.FormValidator.User.Email'],
        validationNames: ['required', 'email']
      },
      {
        key: 'password',
        placeholder: 'Users.Form.Password',
        label: 'Users.Form.Password',
        fieldType: 'Input',
        type: 'password',
        id: 'password',
        validations: [Validators.required],
        validatorMessages: ['Users.FormValidator.Password.Required'],
        validationNames: ['required']
      },
      {
        label: 'Users.Form.Options',
        options$: null,
        key: 'majorGroup',
        fieldType: 'Select',
        id: 'majorGroup',
        validations: [Validators.required],
        validatorMessages: ['Users.FormValidator.Options.Required'],
        validationNames: ['required'],
        placeholder: 'ProductSales.Filter.MajorGroupPlaceholder'
      },
      {
        key: 'save-password',
        label: 'Users.Form.Password',
        fieldType: 'Checkbox',
        defautlValue: true
      }
    ];
  }
}
