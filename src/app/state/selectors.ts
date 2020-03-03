import { State } from './reducer';
import { createSelector } from '@ngrx/store';

export const selectAuth = (state: State) => state.auth;

export const selectUserLogged = createSelector(selectAuth, auth => auth.userLogged);
