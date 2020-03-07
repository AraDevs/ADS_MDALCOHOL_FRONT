import { InputFieldConfig } from '@core/types';
import { Component, OnInit } from '@angular/core';
import { ErrorService, LoadingService, FormService } from '@core/services';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomErrorMessage } from '@shared/types';
import { LoginFormConfig } from '@features/users/config/login-form-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoginFormConfig]
})
export class BaseComponent implements OnInit {

  users$ = this.store$.pipe(select(userState.selectUsers));
  user$ = this.store$.pipe(
    select(userState.selectUser),
    filter(user => user != null)
  );
  loading$: Observable<boolean>;
  error$: Observable<CustomErrorMessage>;


  fields: InputFieldConfig[];
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
    this.fields = this.formConfig.fields;
    this.form = this.formService.createPlainForm(this.fields);

  }

  submit() {
    this.store$.dispatch(userState.LoadUsers());
  }

}
