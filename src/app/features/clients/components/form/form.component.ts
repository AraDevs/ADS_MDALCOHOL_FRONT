import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/clients/config/form-model';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { SuccessService } from '@shared/services';
import { SubSink } from 'subsink';
import * as state from '@features/clients/state';
import * as globalState from '@state/index';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { MODAL_ACCEPT_EVENT } from '../../../../shared/constants/index';
import { FormService } from '@features/providers/components/form/form.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel]
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
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.subs.sink =  this.form.get('departmentId').valueChanges.subscribe(department => {
      const {id} = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({payload: {id}}));
    });
    this.successService.success(state.SAVE_CLIENTS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_CLIENTS);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const dataToSave = this.formService.getProviderDTO(values);
      const action = state.SAVE_CLIENTS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
    }
  }

  execute({ event, data }: any) {
    this.update = !!data;
    if (event === MODAL_INITIAL_EVENT) {
      this.form.patchValue(data);
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
