import { Action, createReducer } from '@ngrx/store';

export interface State {
  app: 'Hello';
}

const INITIAL_STATE: State = {
  app: 'Hello'
};

const globalReducer = createReducer(
  INITIAL_STATE
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
