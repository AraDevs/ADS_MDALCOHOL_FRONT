import { Component, OnInit } from '@angular/core';
import { ErrorService, LoadingService } from '@core/services';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomErrorMessage } from '@shared/types';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  users$ = this.store$.pipe(select(userState.selectUsers));
  user$ = this.store$.pipe(
    select(userState.selectUser),
    filter(user => user != null)
  );
  loading$: Observable<boolean>;
  error$: Observable<CustomErrorMessage>;

  constructor(
    private store$: Store<any>,
    private loading: LoadingService,
    private error: ErrorService) {
  }

  ngOnInit(): void {

    const { LoadUsersAction, UsersLoadedSuccessAction, LoadUsersFailAction } = userState;
    const actions = [LoadUsersAction, UsersLoadedSuccessAction, LoadUsersFailAction];

    this.loading$ = this.loading.getLoading(actions);
    this.error$ = this.error.getError(LoadUsersFailAction, 'Users.Errors.LoadUsersFail');

    this.store$.dispatch(userState.LoadUser({ data: { id: 1 } }));

  }

  load() {
    this.store$.dispatch(userState.LoadUsers());
  }


}
