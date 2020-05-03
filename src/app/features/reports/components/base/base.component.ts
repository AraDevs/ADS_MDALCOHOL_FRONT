import { filter, map, tap, startWith, pairwise, shareReplay } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormModel } from '@features/reports/config/form-model';
import { FactoryFormService } from '@core/services';
import { SelectControlConfig } from '@core/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as dashboardState from '@dashboard-state/index';
import { AppState } from '@state/app-state';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { REPORT_TYPES, REPORT_RESOURCES } from '@features/reports/constants';
import { combineLatest, merge, BehaviorSubject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private dataSet1Control: FormControl;
  private dataSet2Control: FormControl;
  private dataSet1Config: SelectControlConfig;

  private resource = new BehaviorSubject(null);
  resource$ = this.resource.asObservable();

  form: FormGroup;
  fields: SelectControlConfig[];

  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.store$.dispatch(dashboardState.LOAD_CLIENTS_ACTIVE());
    this.store$.dispatch(dashboardState.LOAD_SELLERS());
    this.store$.dispatch(dashboardState.LOAD_DEPARTMENTS());
    this.store$.dispatch(dashboardState.LOAD_MUNICIPALITIES());

    this.dataSet1Control = this.form.get('dataSet1') as FormControl;
    this.dataSet2Control = this.form.get('dataSet2') as FormControl;

    this.dataSet1Config = this.fields.find((controlConfig) => controlConfig.key === 'dataSet1');

    const reportType$ = this.form.get('reportType').valueChanges.pipe(
      startWith(REPORT_TYPES.SALES_BY_CLIENT.value),
      pairwise(),
      filter((val) => !!val),
      map(([, current]) => current.value),
      tap(() => this.resource.next(null)),
      tap((type) => this.controlValidators(type)),
      tap((type) => this.clearDataSet(type)),
      tap((type) => this.formModel.updateReportType(type)),
      shareReplay(1)
    );
    const selectData$ = this.dataSet1Control.valueChanges;

    const data$ = combineLatest([
      reportType$,
      merge(selectData$, this.dataSet2Control.valueChanges),
    ]);

    this.subs.sink = combineLatest([reportType$, selectData$])
      .pipe(
        filter(([type]) => type === REPORT_TYPES.SALES_BY_ZONE.value),
        map(([, department]) => department.value),
        tap((id) =>
          this.store$.dispatch(dashboardState.FILTER_MUNICIPALITIES({ payload: { id } }))
        ),
        tap(() => this.dataSet2Control.setValue(null, { emitEvent: false }))
      )
      .subscribe();

    this.subs.sink = data$
      .pipe(
        filter(([type]) =>
          this.isZoneReport(type) ? this.dataSet2Control.valid : this.dataSet1Control.valid
        ),
        map(([type, obj]) => (this.isBillReport(type) ? [type, ''] : [type, obj.value.toString()])),
        tap(([type, value]) => this.setResource(type, value))
      )
      .subscribe();
  }

  private clearDataSet(type: string) {
    this.dataSet1Control.setValue(null, { emitEvent: false });

    if (this.isZoneReport(type)) {
      this.dataSet2Control.setValue(null, { emitEvent: false });
    }
  }

  private controlValidators(type: string) {
    if (this.isZoneReport(type)) {
      this.dataSet2Control.setValidators([Validators.required]);
      return;
    }

    if (this.isBillReport(type)) {
      this.dataSet1Control.clearValidators();
      this.dataSet2Control.clearValidators();
      return;
    }

    const { validations } = this.dataSet1Config;
    this.dataSet1Control.setValidators(validations);

    this.dataSet2Control.clearValidators();
  }

  private setResource(type: string, value: string) {
    const resourceTemplate = REPORT_RESOURCES[type] as string;
    const resource = resourceTemplate.replace('$$0', value);
    const url = `${environment.host}/${resource}?token=${this.authService.getToken()}`;
    this.resource.next(url);
  }

  private isZoneReport(type: string) {
    return type === REPORT_TYPES.SALES_BY_ZONE.value;
  }

  private isBillReport(type: string) {
    return type === REPORT_TYPES.DELETED_BILLS.value;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
