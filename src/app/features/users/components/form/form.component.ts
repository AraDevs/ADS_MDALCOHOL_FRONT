import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { LoginFormConfig } from '@features/users/config/login-form-config';
import { Store } from '@ngrx/store';
import { SuccessService } from '@shared/services';
import { SubSink } from 'subsink';
import * as UserState from '@features/users/state';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { MODAL_ACCEPT_EVENT, DYNAMIC_MODAL_DATA } from '../../../../shared/constants/index';
import { FormService } from '@features/users/components/form/form.service';
import { MessageService } from '@core/services/message.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UsersState } from '@features/users/state';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [LoginFormConfig, SuccessService, FormService]
})
export class FormComponent implements OnInit {
  private update = false;
  private user: any = null;
  
  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private loginFomConfig: LoginFormConfig,
    private factoryForm: FactoryFormService,
    private store$: Store<UsersState>,
    private successService: SuccessService,
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
  }

  save()
  {
    //console.log(this.form.value);
    if(this.form.valid){
      const values = this.form.value;
      const data = this.formService.getUserDTO(values);
      if(this.update){
        const action = UserState.UPDATE_USERS({
          payload: { data: { ...data, id: this.user.id }}
        });
        this.store$.dispatch(action);
      }
      else{
        const action = UserState.SAVE_USERS({payload: { data } });
        this.store$.dispatch(action);
      }
    }
    else{
      this.message.error('Message.InvalidForm');
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
    }else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
