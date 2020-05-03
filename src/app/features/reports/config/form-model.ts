import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import * as globalState from '@dashboard-state/index';
import { REPORT_TYPES, SELECTORS, MAPPERS } from '@features/reports/constants';

import { select, Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class FormModel {
  private reportTypeSubject = new BehaviorSubject(REPORT_TYPES.SALES_BY_CLIENT);

  constructor(private store$: Store<any>) {}

  getModel(): SelectControlConfig[] {
    return [
      {
        key: 'reportType',
        fieldType: 'Select',
        id: 'reportType',
        cssClasses: '',
        label: 'Report.Form.ReportType',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: of(Object.values(REPORT_TYPES)).pipe(
          map((types) => types.map((type) => ({ label: type, value: type })))
        ),
      },
      {
        key: 'data',
        fieldType: 'Select',
        id: 'data',
        cssClasses: '',
        label: 'Bill.Form.Client',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.reportTypeSubject.pipe(switchMap((type) => this.getData(type))),
      },
    ];
  }

  updateReportType(type: string) {
    this.reportTypeSubject.next(type);
  }

  private getData(type: string) {
    const selector = SELECTORS[type];
    const mapper = MAPPERS[type];

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
