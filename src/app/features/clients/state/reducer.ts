import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'clients';

export interface ClientsState {
  sellers: any[];
}

const INITIAL_STATE: ClientsState = {
  sellers: []
};

const sellersReducer = createReducer(
  INITIAL_STATE,
  on(actions.SellersLoadedSuccess, (state, { payload }) => ({ ...state, sellers: payload })),
);

export function reducer(state: ClientsState | undefined, action: Action) {
  return sellersReducer(state, action);
}
