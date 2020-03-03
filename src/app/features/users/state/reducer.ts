import {createReducer, Action, on} from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'users';

export interface UsersState {
  users: any[];
}

const INITIAL_STATE: UsersState = {
  users: []
};

const usersReducer = createReducer(
  INITIAL_STATE,
  on(actions.UsersLoadedSuccess, (state, {users}) => ({...state, users}))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
