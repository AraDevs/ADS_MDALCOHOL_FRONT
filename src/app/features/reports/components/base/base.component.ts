import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormModel } from '@features/reports/config/form-model';
import { FactoryFormService } from '@core/services';
import { SelectControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import * as dashboardState from '@dashboard-state/index';
import { AppState } from '@state/app-state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit {
  form: FormGroup;
  fields: SelectControlConfig[];

  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.store$.dispatch(dashboardState.LOAD_CLIENTS_ACTIVE());
    this.store$.dispatch(dashboardState.LOAD_SELLERS());


  }

  generateReport() {}
}
