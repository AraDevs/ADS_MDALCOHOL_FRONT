import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'users';

export interface UsersState {
  users: any[];
  user: any;
}

const INITIAL_STATE: UsersState = {
  users: [],
  user: null
};

const usersReducer = createReducer(
  INITIAL_STATE,
  on(actions.UsersLoadedSuccess, (state, { payload }) => ({ ...state, users: payload })),
  on(actions.UserLoadedSuccess, (state, { payload }) => ({ ...state, user: payload }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
