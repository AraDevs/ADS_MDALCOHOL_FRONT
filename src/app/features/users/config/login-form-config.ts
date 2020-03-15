import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputControlConfig, SelectControlConfig, RadioButtonConfig } from '@core/types';
import * as userState from '@features/users/state';
import { Store, select } from '@ngrx/store';
import { usersFeature } from '../state';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginFormConfig {
  constructor(private store$: Store<any>) {}
  
  getModel(): Partial<InputControlConfig | SelectControlConfig | RadioButtonConfig>[] {
    return [
      {
        key: 'user_name',
        label: 'Users.Form.UserName',
        fieldType: 'Input',
        type: 'text',
        id: 'user_name',
        validations: [Validators.required],
        validatorMessages: ['Users.FormValidator.User.Required'],
        validationNames: ['required'],
        cssClasses: 'col-6'
      },
      {
        key: 'name',
        label: 'Users.Form.Name',
        fieldType: 'Input',
        type: 'text',
        id: 'name',
        validations: [Validators.required],
        validatorMessages: ['Users.FormValidator.User.Required'],
        validationNames: ['required'],
        cssClasses: 'col-6'
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
        validationNames: ['required'],
        cssClasses: 'col-6'
      },
      {
        key: 'user_type',
        fieldType: 'Select',
        id: 'user_type',
        cssClasses: 'col-6',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        label: 'Users.Form.UserType',
        options$: this.store$.pipe(select(userState.selectUserType),
          map((userType: string[]) => {
            return userType.map(user => ({ label: user, value: user }));
          }))
      },
      {
        key: 'state',
        id: 'state',
        label: 'Users.Form.State',
        fieldType: 'Checkbox',
        defautlValue: true,
        cssClasses: 'pl-3'
      },
    ];
  }
}
