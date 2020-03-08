import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LoadSellersAction = '[Clients] Load Sellers';
export const SellersLoadedSuccessAction = '[Clients] Sellers Loaded Success';
export const SllersLoadedFailAction = '[Clients] Sellers Loaded Fail';

export const LoadSellers = createAction(LoadSellersAction);
export const SellersLoadedSuccess = createAction(
  SellersLoadedSuccessAction,
  props<{ payload: any[] }>()
);
export const SellersLoadedFail = createAction(
  SllersLoadedFailAction ,
  props<{ payload: ErrorActionData }>()
);