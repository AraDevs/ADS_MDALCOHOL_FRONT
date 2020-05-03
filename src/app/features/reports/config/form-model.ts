import { SelectControlConfig } from '@core/types';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import * as dashboardState from '@dashboard-state/index';
import { REPORT_TYPES, SELECTORS, MAPPERS } from '@features/reports/constants';

import { select, Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class FormModel {
  private reportTypeSubject = new BehaviorSubject(REPORT_TYPES.SALES_BY_CLIENT.value);

  constructor(private store$: Store<any>) {}

  getModel(): SelectControlConfig[] {
    return [
      {
        key: 'reportType',
        fieldType: 'Select',
        id: 'reportType',
        cssClasses: '',
        label: 'Reports.Form.ReportType',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: of(Object.values(REPORT_TYPES)),
      },
      {
        key: 'data',
        fieldType: 'Select',
        id: 'data',
        cssClasses: '',
        label: 'Reports.Form.Clients',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.reportTypeSubject.pipe(switchMap((key) => this.getData(key))),
      },
    ];
  }

  updateReportType(key: string) {
    this.reportTypeSubject.next(key);
  }

  private getData(key: string) {
    const selector = SELECTORS[key];
    const mapper = MAPPERS[key];

    if (selector === REPORT_TYPES.SALES_BY_ZONE) {
      return this.store$.pipe(select(selector));
    }

    return this.store$.pipe(
      select(selector),
      map(
        (data: any[]) => data.map(mapper) as { label: string; value: string; [key: string]: any }[]
      )
    );
  }
}
