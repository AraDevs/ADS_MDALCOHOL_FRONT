import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'clients';

export interface ClientState {
  specialPrices: any[];
}

const INITIAL_STATE: ClientState = {
  specialPrices: []
};

const clientsReducer = createReducer(
  INITIAL_STATE,
  on(actions.SPECIAL_PRICE_LOADED_SUCCESS, (state, { payload }) => ({ ...state, specialPrices: payload }))
);

export function reducer(state: ClientState | undefined, action: Action) {
  return clientsReducer(state, action);
}
