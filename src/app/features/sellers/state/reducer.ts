import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';

export const FEATURE_KEY = 'sellers';

export interface SellersState {
  sellers: any[];
}

const INITIAL_STATE: SellersState = {
  sellers: [],
};

const sellersReducer = createReducer(
  INITIAL_STATE,
  on(actions.SELLERS_LOADED_SUCCESS, (state, { payload }) => ({ ...state, sellers: payload })),
);

export function reducer(state: SellersState | undefined, action: Action) {
  return sellersReducer(state, action);
}
