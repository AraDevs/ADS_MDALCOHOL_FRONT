import { createAction, props } from '@ngrx/store';
import { ErrorActionData } from '@shared/types';

export const LoadSellersAction = '[Sellers] Load Sellers';
export const SellersLoadedSuccessAction = '[Sellers] Sellers Loaded Succes';
export const SellersLoadedFailAction = '[Sellers] Sellers Loaded Fail';

export const LoadSellers = createAction(LoadSellersAction);
export const SellersLoadedSuccess = createAction(SellersLoadedSuccessAction, props<{payload: any[] }>());
export const SellerLoadedFail = createAction(SellersLoadedFailAction, props<{payload: ErrorActionData}>());