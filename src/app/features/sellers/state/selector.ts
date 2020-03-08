import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SellersState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';


export const sellersFeature = createFeatureSelector<AppState, SellersState>(FEATURE_KEY);
export const selectSellers = createSelector(sellersFeature, sellers => sellers.sellers);