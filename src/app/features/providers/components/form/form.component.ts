import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import { FormService } from '@core/services';
import { SubSink } from 'subsink';
import { AppState } from '@state/app-state';
import { Store } from '@ngrx/store';
import * as globalState from '@state/index';
import { SuccessService } from '@shared/services';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService]
})
export class FormComponent implements OnInit {
  private subs = new SubSink();
  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);

    this.subs.sink = this.form.get('department').valueChanges.subscribe(department => {
      const { id } = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({ payload: { id } }));
    });
  }

  save() {}
}
