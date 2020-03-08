import { createAction, props } from '@ngrx/store';
import { ErrorActionData, PayloadAction } from '@shared/types';

export const LoadSellersAction = '[Sellers] Load Sellers';
export const SellersLoadedSuccessAction = '[Sellers] Sellers Loaded Succes';
export const SellersLoadedFailAction = '[Sellers] Sellers Loaded Fail';

export const SaveSellersAction = '[Sellers] Save Sellers';
export const SaveSellersLoadedSuccessAction = '[Sellers] Save Sellers Loaded Succes';
export const SaveSellersLoadedFailAction = '[Sellers] Save Sellers Loaded Fail';

export const LoadSellers = createAction(LoadSellersAction);
export const SellersLoadedSuccess = createAction(SellersLoadedSuccessAction, props<{payload: any[] }>());
export const SellerLoadedFail = createAction(SellersLoadedFailAction, props<{payload: ErrorActionData}>());

/**
 * Las acciones que manden data al servidor deben ser de tipo PayloadAction
 */

export const SaveSellers = createAction(SaveSellersAction ,  props<{payload:PayloadAction }>());
export const SaveSellersLoadedSuccess = createAction(SaveSellersLoadedSuccessAction, props<{payload: any }>());
export const SaveSellerLoadedFail = createAction(SaveSellersLoadedFailAction, props<{payload: ErrorActionData}>());