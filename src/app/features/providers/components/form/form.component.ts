import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorService } from '@shared/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import * as state from '@features/providers/state';
import { Store } from '@ngrx/store';
import { MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT, DYNAMIC_MODAL_DATA } from '@shared/constants';
import { SuccessService } from '@shared/services';
import { AppState } from '@state/app-state';
import * as dashboardState from '@dashboard-state/index';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FormService } from './form.service';
import { MessageService } from '@core/services/message.service';
import { Subject } from 'rxjs';
import { FactoryFormService } from '@core/services';

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
  private provider: any = null;

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

    // If the department change we filter the municipalities
    this.subs.sink = this.form
      .get('department')
      .valueChanges.pipe(filter(deparment => deparment))
      .subscribe(department => {
        const { id } = department;
        this.store$.dispatch(dashboardState.FILTER_MUNICIPALITIES({ payload: { id } }));
      });

    this.successService.success(state.SAVE_PROVIDERS_SUCCESS, () => {
      this.store$.dispatch(dashboardState.LOAD_PROVIDERS());
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });

    this.successService.success(state.UPDATE_PROVIDERS_SUCCESS, () => {
      this.store$.dispatch(dashboardState.LOAD_PROVIDERS());
      this.message.success('Messages.Update.Success').then(() => this.data.modalRef.close());
    });

    this.errorService.error(state.SAVE_PROVIDERS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
    this.errorService.error(state.UPDATE_PROVIDERS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getProviderDTO(values);
      if (this.update) {
        const action = state.UPDATE_PROVIDERS({
          payload: { data: { ...data, id: this.provider.id } }
        });
        this.store$.dispatch(action);
      } else {
        const action = state.SAVE_PROVIDERS({ payload: { data } });
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
        this.provider = this.formService.getProvider(data);
        this.form.patchValue(this.provider);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
