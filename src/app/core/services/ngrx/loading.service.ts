import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { merge, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlainActionCreator } from '@core/types/effect-factory/action-types';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(private dispatcher: ActionsSubject) {}

  getLoading(actions: PlainActionCreator[]) {
    const [trigger, success, faild] = actions;

    const actions$ = merge(
      this.dispatcher.pipe(ofType(trigger)),
      this.dispatcher.pipe(ofType(success)),
      this.dispatcher.pipe(ofType(faild))
    );

    const triggerAction$ = this.dispatcher.pipe(ofType(trigger));
    return combineLatest([triggerAction$, actions$]).pipe(
      map(([triggerAction, action]) => {
        return triggerAction.type === action.type;
      })
    );
  }
}
