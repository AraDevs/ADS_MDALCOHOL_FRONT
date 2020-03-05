import {Injectable} from '@angular/core';
import * as actions from './actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {RequestClient} from '@core/client/request-client';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions, private requestClient: RequestClient) {
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.LoadUsers),
      switchMap(() => {
          const requestConfig = {
            data: {
              resource: 'https://jsonplaceholder.typicode.com/users'
            }
          };
          return this.requestClient.get<any[]>(requestConfig).result.pipe(
            map(result => {
              const {data, errors, success} = result;
              return actions.UsersLoadedSuccess({users: data});
            }),
            catchError(() => EMPTY)
          );
        }
      ))
  );

}
