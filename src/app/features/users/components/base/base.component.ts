import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService, FormService, LoadingService } from '@core/services';
import { InputFieldConfig, FieldConfig, SelectFieldConfig } from '@core/types';
import { LoginFormConfig } from '@features/users/config/login-form-config';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { CustomErrorMessage } from '@shared/types';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';




@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoginFormConfig]
})
export class BaseComponent implements OnInit {

  users$ = this.store$.pipe(select(userState.selectUsers));
  options$ = this.users$.pipe(map(users => {
   return users.map(user => ({ label: user.name }));
  })).pipe(tap(console.log));

  user$ = this.store$.pipe(
    select(userState.selectUser),
    filter(user => user != null)
  );
  loading$: Observable<boolean>;
  error$: Observable<CustomErrorMessage>;


  fields: FieldConfig[];
  form: FormGroup;

  constructor(
    private store$: Store<any>,
    private loading: LoadingService,
    private error: ErrorService,
    private formConfig: LoginFormConfig,
    private formService: FormService, ) {
  }

  ngOnInit(): void {

    const { LoadUsersAction, UsersLoadedSuccessAction, LoadUsersFailAction } = userState;
    const actions = [LoadUsersAction, UsersLoadedSuccessAction, LoadUsersFailAction];

    this.loading$ = this.loading.getLoading(actions);
    this.error$ = this.error.getError(LoadUsersFailAction, 'Users.Errors.LoadUsersFail');

    this.store$.dispatch(userState.LoadUser({ data: { id: 1 } }));

    // Config form
    this.fields = this.formConfig.fields.map((field: FieldConfig) => {

      if (field.fieldType === 'Select') {
        const _field = field as SelectFieldConfig;
        return { ..._field, options$: this.options$ } as FieldConfig;
      }
      return field as FieldConfig;

    });


    this.form = this.formService.createPlainForm(this.fields);

  }

  submit() {
   console.log(this.form);


  }

  load(){
    this.store$.dispatch(userState.LoadUsers());
  }
}
