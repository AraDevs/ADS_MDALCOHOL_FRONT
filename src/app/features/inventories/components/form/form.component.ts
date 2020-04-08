import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormModel } from '@features/inventories/config/form-model';
import { SuccessService, ErrorService } from '@shared/services';
import { FormService } from '@features/inventories/components/form/form.service';
import { FormGroup, AbstractControl, FormGroupDirective } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FactoryFormService } from '@core/services';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT } from '@shared/constants';
import { MessageService } from '@core/services/message.service';
import * as state from '@features/inventories/state';
import * as globalState from '@state/index';
import { DYNAMIC_MODAL_DATA } from '@shared/constants/index';
import { SubSink } from 'subsink';
import { Subject } from 'rxjs';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService, ErrorService]
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  private subs = new SubSink();
  private errors = new Subject<string[]>();
  private update = false;
  private inventory: any = null;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private errorService: ErrorService,
    private formService: FormService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.hideProviderControl();

    this.successService.success(state.SAVE_INVENTORIES_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_INVENTORIES());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(state.UPDATE_INVENTORIES_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_INVENTORIES());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });
    this.errorService.error(state.SAVE_INVENTORIES_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(state.UPDATE_INVENTORIES_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      if (this.update) {
        const data = this.formService.getInventoryDTO({...values, type: null});
        const action = state.UPDATE_INVENTORIES({
          payload: { data: { ...data, id: this.inventory.id } }
        });
        this.store$.dispatch(action);
      } else {
        const data = this.formService.getInventoryDTO(values);
        const action = state.SAVE_INVENTORIES({ payload: { data } });
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
        this.inventory = this.formService.getInventory(data);
        this.form.patchValue(this.inventory);

        const { type } = this.inventory;
        const hide = type.value.toLowerCase() === 'producto final';
        this.hideProvider(hide);

        this.formModel.hideProducType$.next(true);
        this.form.get('type').clearValidators();
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }

  private hideProviderControl() {
    const typeControl = this.form.get('type');
    this.subs.sink = typeControl.valueChanges.subscribe(value => {
      const hide = value.value.toLowerCase() === 'producto final';
      this.hideProvider(hide);
    });
  }

  private hideProvider(hide: boolean) {
    const control = this.getProviderControl();
    const field = this.getProviderField();
    this.formModel.hideProviders$.next(hide);

    if (hide) {
      control.setValue(null);
      control.clearValidators();
      control.updateValueAndValidity();
      return;
    }
    control.setValidators(field.validations as any);
  }

  private getProviderControl() {
    return this.form.get('provider');
  }

  private getProviderField() {
    return this.formModel.getModel().find(obj => obj.key === 'provider');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
