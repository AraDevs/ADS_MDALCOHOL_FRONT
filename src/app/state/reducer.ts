import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export interface State {
  departments: any[];
  municipalities: any[];
  clients: any[];
  products: any[];
  sellers: any[];
  providers: any[];
}

const INITIAL_STATE: State = {
  departments: [],
  municipalities: [],
  clients: [],
  products: [],
  sellers: [],
  providers: []
};

const globalReducer = createReducer(
  INITIAL_STATE,
  on(actions.SELLERS_LOADED_SUCCESS, (state, {payload}) => ({ ...state, sellers: payload }))
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
