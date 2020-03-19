import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { ClientState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';

export const clientsFeature = createFeatureSelector<AppState, ClientState>(FEATURE_KEY);
export const selectSpecialPrices = createSelector(
  clientsFeature,
  (clients: ClientState) => clients.specialPrices
);
