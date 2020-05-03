import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectControlConfig } from '@core/types';
import { MAPPERS, REPORT_LABELS, REPORT_TYPES, SELECTORS } from '@features/reports/constants';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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
        key: 'data',
        fieldType: 'Select',
        id: 'data',
        cssClasses: '',
        label: this.reportTypeSubject.pipe(
          filter((type) => type !== REPORT_TYPES.DELETED_BILLS.value),
          map((type) => this.getLabel(type))
        ),
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
        options$: this.reportTypeSubject.pipe(
          filter((type) => type !== REPORT_TYPES.DELETED_BILLS.value),
          switchMap((type) => this.getData(type))
        ),
        hidden$: this.reportTypeSubject.pipe(
          map((type) => type === REPORT_TYPES.DELETED_BILLS.value)
        ),
      },
      {
        key: 'municipalities',
        fieldType: 'Select',
        id: 'municipalities',
        cssClasses: '',
        label: 'Reports.Form.Municipalities',
        validations: [Validators.required],
        validatorMessages: ['FormValidator.RequiredSelected'],
        validationNames: ['required'],
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


  private getLabel(type: string) {
    return REPORT_LABELS[type];
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
