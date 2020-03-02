import { GlobalState } from './global.reducer';
import { createSelector } from '@ngrx/store';

export const selectAuth = (state: GlobalState) => state.auth;

export const selectUserLogged = createSelector(selectAuth, auth => auth.userLogged);
