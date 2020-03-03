import * as actions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  auth: {
    userLogged: string;
  };
}

const INITIAL_STATE: State = {
  auth: {
    userLogged: null
  }
};

const globalReducer = createReducer(
  INITIAL_STATE,
  on(actions.SetLoggedUser, (state, { username }) => ({ ...state, auth: { userLogged: username } }))
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
