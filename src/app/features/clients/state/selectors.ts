import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState} from '@state/app-state';
import { ClientsState, FEATURE_KEY } from './reducer';

export const clientsFeature = createFeatureSelector<AppState, ClientsState>(FEATURE_KEY);
export const selectSellers = createSelector(clientsFeature, clients => clients.sellers);