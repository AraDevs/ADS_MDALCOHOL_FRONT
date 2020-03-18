import { Component, OnInit, ViewChild, ElementRef, Injectable, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlConfig } from '@core/types';
import { SelectControlConfig } from '../../../../core/types/forms/select-control-config';
import { FormModel } from '@features/production-orders/config/form-model';
import { FactoryFormService } from '@core/services';
import { MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT } from '../../../../shared/constants/index';
import { SuccessService } from '@shared/services';
import { FormService } from './form.service';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as state from '@features/production-orders/state';
import * as globalState from '@state/index';
import { MessageService } from '@core/services/message.service';
import { DYNAMIC_MODAL_DATA } from '@shared/constants';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService]
})
export class FormComponent implements OnInit {
  private update = false;
  private productionOrder: any = null;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private formService: FormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.successService.success(state.SAVE_PRODUCTION_ORDERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(state.UPDATE_PRODUCTION_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      console.log(values);
      const data = this.formService.getProductionOrderDTO(values);
      if (this.update) {
        const action = state.UPDATE_PRODUCTION_ORDERS({
          payload: { data: { ...data, id: this.productionOrder.id }}
        });
        this.store$.dispatch(action);
      } else {
        const action = state.SAVE_PRODUCTION_ORDERS({ payload: { data }});
        this.store$.dispatch(action);
      }
    } else {
      this.message.error('Message.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.productionOrder = this.formService.getProductionOrder(data);
        this.form.patchValue(this.productionOrder);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
