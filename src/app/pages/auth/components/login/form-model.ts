import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputControlConfig } from '@core/types';

@Injectable()
export class FormModel {
  constructor() {}

  getModel(): Partial<InputControlConfig>[] {
    return [
      {
        key: 'username',
        fieldType: 'Input',
        id: 'username',
        cssClasses: 'col-12',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Login.Form.Username',
        autocomplete: 'off'
      },
      {
        key: 'password',
        fieldType: 'Input',
        id: 'password',
        type: 'password',
        cssClasses: 'col-12',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.Required'],
        validationNames: ['required'],
        label: 'Login.Form.Password',
        autocomplete: 'off'

      },
    ];
  }
}
