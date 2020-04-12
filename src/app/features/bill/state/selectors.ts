import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { BillState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';

export const billFeature = createFeatureSelector<AppState, BillState>(FEATURE_KEY);
export const selectBillDetail = createSelector(billFeature, (bill: BillState) => bill.detailBill);
