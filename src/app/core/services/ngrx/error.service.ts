import { ActionsSubject, Action } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorActionData, CustomErrorMessage } from '@shared/types';
import { Observable } from 'rxjs';

interface ErrorAction extends Action, ErrorActionData { }

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private dispatcher: ActionsSubject) { }

  getError(actionToListen: string, message: string): Observable<CustomErrorMessage> {
    return this.dispatcher.pipe(ofType(actionToListen)).pipe(
      map((action: ErrorAction) => {
        const { error, fromServer } = action;
        return { message: fromServer ? error : message, translate: !fromServer };
      })
    );
  }

}
