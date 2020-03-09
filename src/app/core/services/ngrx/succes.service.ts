import { ActionsSubject, Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorActionData, CustomErrorMessage } from '@shared/types';
import { Observable } from 'rxjs';
import { ErrorActionCreator } from '@core/types/effect-factory/action-types';
import {PlainActionCreator, DataActionCreator} from '@core/types'

type Action = PlainActionCreator | DataActionCreator;

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private dispatcher: ActionsSubject) {}

  getError(actionToListen: Action, callback: Function): Observable<CustomErrorMessage> {
    return this.dispatcher.pipe(ofType(actionToListen)).pipe(
      map(({ payload }) => {
        const { error, fromServer } = payload;
        return { message: fromServer ? error : message, translate: !fromServer };
      })
    );
  }
}
