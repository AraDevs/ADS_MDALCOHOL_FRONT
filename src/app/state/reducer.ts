import * as actions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  auth: {
    userLogged: string;
  };
  actionInProcess: { action: string, key?: string; }[];
  errors: { action: string, error: string; }[];
}

const INITIAL_STATE: State = {
  auth: {
    userLogged: null
  },
  actionInProcess: [],
  errors: []
};

const globalReducer = createReducer(
  INITIAL_STATE,
  on(actions.GlobalError, (state, { data }) => ({ ...state, errors: [...state.errors, data] })),
  on(actions.RemoveGlobalError, (state, { data }) => ({
    ...state,
    errors: state.errors.filter(obj => obj.action !== data.action)
  })),
  on(actions.AddActionInProcess, (state, { data }) => ({
    ...state,
    actionInProcess: [...state.actionInProcess, data]
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
