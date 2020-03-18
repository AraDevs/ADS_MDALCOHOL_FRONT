import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormModel } from '@features/sellers/config/form-model';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import { SuccessService } from '@shared/services';
import { FormService } from '@features/sellers/components/form/form.service';import { FactoryFormService } from '@core/services';
import { AppState } from '@state/app-state';
import * as state from '@features/sellers/state';
import * as globalState from '@state/index';
import { Store } from '@ngrx/store';
import { MessageService } from '@core/services/message.service';
import { DYNAMIC_MODAL_DATA, MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT } from '@shared/constants';
;

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService]
})
export class FormComponent implements OnInit {
  private update = false;
  private seller: any = null;
  
  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;

  constructor(private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private formService: FormService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
    ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.successService.success(state.SAVE_SELLERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_SELLERS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(state.UPDATE_SELLERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_SELLERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });
  }

  save()
  {  
    if(this.form.valid){
      const values = this.form.value;
      const data = this.formService.getSellerDTO(values);      
      if(this.update){
        const action = state.UPDATE_SELLERS({
          payload: { data: { ...data, id: this.seller.id }}
        });
        this.store$.dispatch(action);
      }
      else{
        const action = state.SAVE_SELLERS({payload: { data } });
        this.store$.dispatch(action);
      }
    }
    else{
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any){
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {        
        this.seller = this.formService.getSeller(data);
        this.form.patchValue(this.seller);
      }
    }else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
