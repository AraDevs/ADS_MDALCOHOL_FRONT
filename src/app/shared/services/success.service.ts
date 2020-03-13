import { Injectable, OnDestroy } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { SubSink } from 'subsink';
import { ActionsSubject } from '@ngrx/store';
import { PlainActionCreator, DataActionCreator } from '@core/types';

type Action = PlainActionCreator | DataActionCreator;

@Injectable()
export class SuccessService implements OnDestroy {
  private subs = new SubSink();
  constructor(private dispatcher: ActionsSubject) {}

  success(actionToListen: Action, callback: () => void) {
    this.subs.sink = this.dispatcher.pipe(ofType(actionToListen)).subscribe(() => {
      callback();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
