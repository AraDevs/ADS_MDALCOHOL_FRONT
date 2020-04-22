import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';
import * as moment from 'moment';

export const FEATURE_KEY = 'purchases';

export interface PurchaseState {
  purchaseDetail: any;
}

const INITIAL_STATE: PurchaseState = {
  purchaseDetail: null,
};

const purchaseReducer = createReducer(
  INITIAL_STATE,
  on(actions.PURCHASE_DETAIL_LOADED_SUCCESS, (state, { payload }) => ({
    ...state,
    purchaseDetail: { ...payload /*bill_date: moment(payload.bill_date).format('DD-MM-YYYY')*/ },
  })),
  on(actions.CLEAR_PURCHASE_DETAIL, (state) => ({
    ...state,
    purchaseDetail: null,
  }))
);

export function reducer(state: PurchaseState | undefined, action: Action) {
  return purchaseReducer(state, action);
}
