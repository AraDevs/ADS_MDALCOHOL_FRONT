import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProvidersState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';

export const providersFeature = createFeatureSelector<AppState, ProvidersState>(FEATURE_KEY);
export const selectProviders = createSelector(providersFeature, providers => providers.providers);
