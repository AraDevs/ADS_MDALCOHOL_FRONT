import {Injectable} from '@angular/core';
import * as actions from './actions';
import {RequestClientService} from '@core/services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {EMPTY} from 'rxjs';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private requestClient: RequestClientService) {

  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LoadUsers),
      switchMap(() =>
        this.requestClient.getData().pipe(
          map((users: any[]) => actions.UsersLoadedSuccess({users})),
          catchError(() => EMPTY)
        )))
  );

}
