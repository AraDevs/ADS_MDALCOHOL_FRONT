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
  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  dataUsers: Observable<any[]>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'username', 'actions'],
    titles: {
      name: 'Users.Table.Titles.Name',
      username: 'Users.Table.Titles.User',
      actions: 'Acciones'
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
    this.fields = this.formConfig.getModel()
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(userState.LOAD_USERS());
    this.dataUsers = this.store$.pipe(select(userState.selectUsers));
  }
  
  save()
  {
    if (this.form.valid) {
      const values = this.form.value;

      const dataToSave = {
        username: values.user_name,
        name: values.name,
        pass: values.password,
        user_type: "Produccion",
        state: values.state ? 1 : 0
      };

      console.log(dataToSave);
      const action = userState.SAVE_USERS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
    }
  }

  update(users: any)
  {
    this.form.patchValue({ 
      user_name: users.username,
      name: users.name,
     });
  }
}
