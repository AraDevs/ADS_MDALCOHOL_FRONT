import { State } from './reducer';
import { AppState } from './app-state';
import { createSelector } from '@ngrx/store';

export const selectData = (state: AppState) => state.data;
export const selectSellers = createSelector(selectData, (state: State) => state.sellers);
export const selectDepartments = createSelector(selectData, (state: State) => state.departments);
export const selectMunicipalities = createSelector(selectData, (state: State) => state.filterMunicipalities);
export const selectClients = createSelector(selectData, (state: State) => state.clients);
