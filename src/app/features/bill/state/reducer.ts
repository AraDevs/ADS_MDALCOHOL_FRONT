import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './actions';
import * as moment from 'moment';

export const FEATURE_KEY = 'bill';

export interface BillState {
  detailBill: any;
}

const INITIAL_STATE: BillState = {
  detailBill: null,
};

const billReducer = createReducer(
  INITIAL_STATE,
  on(actions.BILL_DETAIL_LOADED_SUCCESS, (state, { payload }) => ({
    ...state,
    detailBill: {...payload, bill_date: moment(payload.bill_date).format('DD-MM-YYYY')},
  })),
  on(actions.CLEAR_BILL_DETAIL, (state) => ({
    ...state,
    detailBill: null,
  }))
);

export function reducer(state: BillState | undefined, action: Action) {
  return billReducer(state, action);
}
