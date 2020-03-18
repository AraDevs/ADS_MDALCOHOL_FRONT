import { OnDestroy } from '@angular/core';
import { LoadingAction } from '@core/types/effect-factory/action-types';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubSink } from 'subsink';

export class LoadingService implements OnDestroy {
  private subs = new SubSink();
  private loading = new BehaviorSubject(true);
  constructor(private dispatcher: ActionsSubject) {}

  getLoading(actions: LoadingAction[]) {
    const [trigger, success, faild] = actions;

    const actions$ = merge(
      this.dispatcher.pipe(ofType(trigger)),
      this.dispatcher.pipe(ofType(success)),
      this.dispatcher.pipe(ofType(faild))
    );

    const triggerAction$ = this.dispatcher.pipe(ofType(trigger));

    this.subs.sink = combineLatest([triggerAction$, actions$])
      .pipe(
        map(([triggerAction, action]) => {
          return triggerAction.type === action.type;
        })
      )
      .subscribe(loading => this.loading.next(loading));

    return this.loading.asObservable();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
