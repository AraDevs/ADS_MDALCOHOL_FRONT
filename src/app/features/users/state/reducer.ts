import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'users';

export interface UsersState {
  users: any[];
  user: any;
  userType: string[];
}

const INITIAL_STATE: UsersState = {
  users: [],
  user: null,
  userType: ['Administración', 'Producción'],
};

const usersReducer = createReducer(
  INITIAL_STATE,
  on(actions.USERS_LOADED_SUCCESS, (state, { payload }) => ({ ...state, users: payload })),
  on(actions.USER_LOADED_SUCCESS, (state, { payload }) => ({ ...state, user: payload }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
