import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { MessageService } from '@core/services/message.service';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormService } from '@features/users/components/form/form.service';
import { LoginFormConfig } from '@features/users/config/form-model';
import * as UserState from '@features/users/state';
import { UsersState } from '@features/users/state';
import { Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { SuccessService, ErrorService } from '@shared/services';
import { DYNAMIC_MODAL_DATA, MODAL_ACCEPT_EVENT } from '@shared/constants/index';
import { Subject } from 'rxjs';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [LoginFormConfig, SuccessService, FormService, ErrorService]
})
export class FormComponent implements OnInit {
  private update = false;
  private errors = new Subject<string[]>();
  private user: any = null;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private loginFomConfig: LoginFormConfig,
    private factoryForm: FactoryFormService,
    private store$: Store<UsersState>,
    private successService: SuccessService,
    private errorService: ErrorService,
    private formService: FormService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.fields = this.loginFomConfig.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.successService.success(UserState.SAVE_USERS_SUCCESS, () => {
      this.store$.dispatch(UserState.LOAD_USERS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(UserState.UPDATE_USERS_SUCCESS, () => {
      this.store$.dispatch(UserState.LOAD_USERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });

    this.errorService.error(UserState.SAVE_USERS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(UserState.UPDATE_USERS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getUserDTO(values);
      if (this.update) {
        const action = UserState.UPDATE_USERS({
          payload: { data: { ...data, id: this.user.id }}
        });
        this.store$.dispatch(action);
      } else {
        const action = UserState.SAVE_USERS({payload: { data } });
        this.store$.dispatch(action);
      }
    } else {
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.user = this.formService.getUser(data);
        this.form.patchValue(this.user);
        //Aquí se elimina la password como algo necesario para el update
        this.form.get('pass').disable();
        this.form.get('pass').clearValidators();
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
