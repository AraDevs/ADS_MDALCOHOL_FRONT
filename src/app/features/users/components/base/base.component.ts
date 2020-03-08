import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService, FormService, LoadingService } from '@core/services';
import { InputControlConfig, ControlConfig, SelectControlConfig } from '@core/types';
import { LoginFormConfig } from '@features/users/config/login-form-config';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { CustomErrorMessage, DataTableConfig } from '@shared/types';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { PlainActionCreator } from '@core/types/effect-factory/action-types';
import { AppState } from '@state/app-state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoginFormConfig]
})
export class BaseComponent implements OnInit {
  users$ = this.store$.pipe(select(userState.selectUsers));
  options$ = this.users$.pipe(
    map(users => {
      return users.map(user => ({ label: user.name }));
    })
  );

  user$ = this.store$.pipe(
    select(userState.selectUser),
    filter(user => user != null)
  );
  loading$: Observable<boolean>;
  error$: Observable<CustomErrorMessage>;

  fields: ControlConfig[];
  form: FormGroup;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'username'],
    titles: {
      name: 'Users.Table.Titles.Name',
      username: 'Users.Table.Titles.User'
    }
    // sortActiveColumn: 'name',
    // sortDirection: 'asc'
  };

  constructor(
    private store$: Store<AppState>,
    private loading: LoadingService,
    private error: ErrorService,
    private formConfig: LoginFormConfig,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    const actions = [
      userState.LOAD_USERS,
      userState.USERS_LOADED_SUCCESS,
      userState.USERS_LOADED_FAIL
    ] as PlainActionCreator[];

    this.loading$ = this.loading.getLoading(actions);
    this.error$ = this.error.getError(userState.USERS_LOADED_FAIL, 'Users.Errors.LoadUsersFail');

    this.store$.dispatch(
      userState.LOAD_USER({
        payload: { metadata: { resource: { id: '2' } } }
      })
    );

    // Config form
    this.fields = this.formConfig.fields.map((field: ControlConfig) => {
      if (field.fieldType === 'Select') {
        const _field = field as SelectControlConfig;
        return { ..._field, options$: this.options$ } as ControlConfig;
      }
      return field as ControlConfig;
    });

    this.form = this.formService.createPlainForm(this.fields);
    this.store$.dispatch(userState.LOAD_USERS());
  }

  submit() {
    console.log(this.form);
    // this.store$.dispatch(userState.LoadUsers());
  }
}
