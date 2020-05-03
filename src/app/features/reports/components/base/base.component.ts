import { filter, map, tap } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormModel } from '@features/reports/config/form-model';
import { FactoryFormService } from '@core/services';
import { SelectControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import * as dashboardState from '@dashboard-state/index';
import { AppState } from '@state/app-state';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { REPORT_TYPES } from '@features/reports/constants';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

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
    this.store$.dispatch(dashboardState.LOAD_DEPARTMENTS());
    this.store$.dispatch(dashboardState.LOAD_MUNICIPALITIES());

    const reportType$ = this.form.get('reportType').valueChanges.pipe(
      filter((val) => !!val),
      map(({ value }) => value),
      tap((type) => this.formModel.updateReportType(type))
    );
    const data$ = this.form.get('data').valueChanges;

    this.subs.sink = combineLatest([reportType$, data$])
      .pipe(
        filter(([type]) => type === REPORT_TYPES.SALES_BY_ZONE.value),
        map(([, department]) => department.id),
        tap((id) => this.store$.dispatch(dashboardState.FILTER_MUNICIPALITIES({ payload: { id } })))
      )
      .subscribe();
  }

  generateReport() {}

  ngOnDestroy() {}
}
