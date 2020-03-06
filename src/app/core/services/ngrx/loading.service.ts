import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  constructor(private dispatcher: ActionsSubject) {}

  getLoading(actions: string[]) {
    const [trigger, success, faild] = actions;

    return merge(
      this.dispatcher.pipe(ofType(trigger)),
      this.dispatcher.pipe(ofType(success)),
      this.dispatcher.pipe(ofType(faild))
    ).pipe(map(action => action.type === trigger));

  }
}
