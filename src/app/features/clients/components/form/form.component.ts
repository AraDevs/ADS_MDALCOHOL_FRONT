import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/clients/config/form-model';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { SuccessService, ErrorService } from '@shared/services';
import { SubSink } from 'subsink';
import * as state from '@features/clients/state';
import * as globalState from '@dashboard-state/index';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { MODAL_ACCEPT_EVENT, DYNAMIC_MODAL_DATA } from '../../../../shared/constants/index';
import { FormService } from '@features/clients/components/form/form.service';
import { MessageService } from '@core/services/message.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService, ErrorService]
})
export class FormComponent implements OnInit {
  private subs = new SubSink();
  private errors = new Subject<string[]>();
  private update = false;
  private client: any = null;

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
  ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.subs.sink =  this.form.get('departmentId').valueChanges.subscribe(department => {
      const {id} = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({payload: {id}}));
    });
    this.successService.success(state.SAVE_CLIENTS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_CLIENTS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.successService.success(state.UPDATE_CLIENTS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_CLIENTS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });
    this.errorService.error(state.SAVE_CLIENTS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(state.UPDATE_CLIENTS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getClientDTO(values);
      if (this.update) {
        const action = state.UPDATE_CLIENTS({
          payload: { data: { ...data, id: this.client.id }}
        });
        this.store$.dispatch(action);
      } else {
        const action = state.SAVE_CLIENTS({ payload: { data } });
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
        this.client = this.formService.getClient(data);
        this.form.patchValue(this.client);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
