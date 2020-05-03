import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectControlConfig } from '@core/types';
import {
  MAPPERS,
  LABELS_DATA_SET_1,
  REPORT_TYPES,
  SELECTORS,
  LABELS_DATA_SET_2,
} from '@features/reports/constants';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map, switchMap, tap, skip } from 'rxjs/operators';
import * as dashboardState from '@dashboard-state/index';

@Injectable()
export class FormModel {
  private reportTypeSubject = new BehaviorSubject(REPORT_TYPES.SALES_BY_CLIENT.value);
  private departMentIdSubject = new Subject<number>();

  constructor(private store$: Store<any>) {}

  getModel(): SelectControlConfig[] {
    return [
      {
        key: 'reportType',
        fieldType: 'Select',
        id: 'reportType',
        cssClasses: '',
        label: 'Reports.Form.ReportTypes',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: of(Object.values(REPORT_TYPES)),
      },
      {
        key: 'dataSet1',
        fieldType: 'Select',
        id: 'dataSet1',
        cssClasses: '',
        label: this.reportTypeSubject.pipe(
          filter((type) => type !== REPORT_TYPES.DELETED_BILLS.value),
          map((type) => LABELS_DATA_SET_1[type])
        ),
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.reportTypeSubject.pipe(
          skip(1),
          filter((type) => type !== REPORT_TYPES.DELETED_BILLS.value),
          switchMap((type) => this.getData(type))
        ),
        hidden$: this.reportTypeSubject.pipe(
          map((type) => type === REPORT_TYPES.DELETED_BILLS.value)
        ),
      },
      {
        key: 'dataSet2',
        fieldType: 'Select',
        id: 'dataSet2',
        cssClasses: '',
        label: this.reportTypeSubject.pipe(
          filter((type) => type !== REPORT_TYPES.DELETED_BILLS.value),
          map((type) => LABELS_DATA_SET_2[type])
        ),
        validations: [Validators.required],
        validatorMessages: [],
        validationNames: [],
        options$: this.store$.pipe(select(dashboardState.selectMunicipalities)),
        hidden$: this.reportTypeSubject.pipe(
          map((type) => type !== REPORT_TYPES.SALES_BY_ZONE.value)
        ),
      },
    ];
  }

  updateReportType(type: string) {
    this.reportTypeSubject.next(type);
  }

  private getData(type: string) {
    const selector = SELECTORS[type];
    const mapper = MAPPERS[type];

    if (type === REPORT_TYPES.SALES_BY_ZONE.value) {
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
