import { State } from './reducer';
import { AppState } from './app-state';
import { createSelector, props } from '@ngrx/store';

export const selectData = (state: AppState) => state.data;
export const selectSellers = createSelector(selectData, (state: State) => state.sellers);
export const selectSellersById = createSelector(selectData, 
    (state: State, seller: number) => state.sellers.find((s) => s.id === seller));
export const selectDepartments = createSelector(selectData, (state: State) => state.departments);

export const selectDepartmentByMunicipalityId = createSelector(selectData,
    (state: State, municipalityId: number) => state.municipalities.find((m) => m.id === municipalityId).department);

export const selectMunicipalities = createSelector(selectData, (state: State) => state.filterMunicipalities);
export const selectMunicipalityById = createSelector(selectData, (state: State, municipalityId) => 
state.municipalities.find(m => m.id === municipalityId));

export const selectClients = createSelector(selectData, (state: State) => state.clients);

export const selectTypePerson = createSelector(selectData, (state: State) => state.typesPerson);
