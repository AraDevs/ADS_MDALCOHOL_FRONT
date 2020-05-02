import { Component, OnInit, ViewChild, ElementRef, Injectable, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlConfig } from '@core/types';
import { SelectControlConfig } from '../../../../core/types/forms/select-control-config';
import { FormModel } from '@features/production-orders/config/form-model';
import { FactoryFormService } from '@core/services';
import { MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT } from '../../../../shared/constants/index';
import { SuccessService, ErrorService } from '@shared/services';
import { FormService } from './form.service';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as state from '@features/production-orders/state';
import * as globalState from '@dashboard-state/index';
import { MessageService } from '@core/services/message.service';
import { DYNAMIC_MODAL_DATA } from '@shared/constants';
import * as moment from 'moment';
import { Subject, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService, ErrorService]
})
export class FormComponent implements OnInit {
  private update = false;
  private errors = new Subject<string[]>();
  private productionOrder: any = null;
  hidden$ = new BehaviorSubject(true);

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private formService: FormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private errorService: ErrorService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.hideProductionControl();

    this.successService.success(state.SAVE_PRODUCTION_ORDERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(state.UPDATE_PRODUCTION_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });

    this.successService.success(state.FINISH_PRODUCTION_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });

    this.errorService.error(state.SAVE_PRODUCTION_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(state.SAVE_PRODUCTION_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(state.FINISH_PRODUCTION_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
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
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.productionOrder = this.formService.getProductionOrder(data);
        this.form.patchValue(this.productionOrder);
        const { end_date } = this.productionOrder;
        const hide = end_date;
        this.hideProduction(hide);
        this.hidden$.next(false);
        this.formModel.hideEndDate$.next(true);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }

  private hideProductionControl() {
    const typeControl = this.form.get('end_date');
  }

  private hideProduction(hide: boolean) {
    const control = this.getProductionOrderControl();
    const field = this.getProductionOrderField();
    this.formModel.hideEndDate$.next(hide);

    if (hide) {
      control.setValue(null);
      control.clearValidators();
      return;
    }
    control.setValidators(field.validations as any);
  }

  private getProductionOrderControl() {
    return this.form.get('end_date');
  }

  private getProductionOrderField() {
    return this.formModel.getModel().find(obj => obj.key === 'end_date');
  }

  updateFinishProduction() {
    this.message.messageWarning('Messages.FinishOrder')
      .then((result) => {
        if (result.dismiss !== Swal.DismissReason.cancel) {
          const { id } = this.productionOrder;
          this.store$.dispatch(state.FINISH_PRODUCTION_ORDERS({ payload: { data: {id} }}));
        }
      });
  }
}
