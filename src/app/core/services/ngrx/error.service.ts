import { ActionsSubject, Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { ErrorActionData, CustomErrorMessage } from '@shared/types';
import { Observable } from 'rxjs';
import { ErrorActionCreator } from '@core/types/effect-factory/action-types';
import { SubSink } from 'subsink';

@Injectable()
export class ErrorService implements OnDestroy {
  private subs = new SubSink();
  constructor(private dispatcher: ActionsSubject) {}

  error(actionToListen: ErrorActionCreator, callback: (payload: any) => void) {
    this.subs.sink = this.dispatcher.pipe(ofType(actionToListen)).subscribe(({ payload }) => {
      let customErrorsServer = [];
      const { error } = payload;
      if (error.hasOwnProperty('errors')) {
        customErrorsServer = Object.keys(error.errors).reduce((errs, key) => {
          return [...errs, ...error.errors[key]];
        }, []);
      }
      callback({ customErrorsServer });
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
