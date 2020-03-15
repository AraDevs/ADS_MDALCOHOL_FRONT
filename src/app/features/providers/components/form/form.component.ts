import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import * as state from '@features/providers/state';
import { Store } from '@ngrx/store';
import { MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT } from '@shared/constants';
import { SuccessService } from '@shared/services';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FormService } from './form.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService, FormService]
})
export class FormComponent implements OnInit {
  private subs = new SubSink();
  private update = false;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private formService: FormService,
    private message: MessageService
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
        this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({ payload: { id } }));
      });

    this.successService.success(state.SAVE_PROVIDERS_SUCCESS, () => {
      this.form.reset();
      this.store$.dispatch(globalState.LOAD_PROVIDERS);
    });
  }

  save() {
    if (this.form.valid) {
      if (this.update) {
        this.message.success('Messages.Add.Success');
        return;
      }

      const values = this.form.value;
      const data = this.formService.getProviderDTO(values);
      const action = state.SAVE_PROVIDERS({ payload: { data } });
      this.store$.dispatch(action);
      return;
    }
    this.message.error('Messages.InvalidForm');
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.form.patchValue(this.formService.getProvider(data));
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
