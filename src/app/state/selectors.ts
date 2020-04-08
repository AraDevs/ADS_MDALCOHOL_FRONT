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

export const selectProviders = createSelector(selectData, (state: State) => state.providers);
export const selectProviderById = createSelector(selectData,
    (state: State, provider: number) => state.providers.find((s) => s.id === provider));

// Inventories
export const selectInventories = createSelector(selectData, (state: State) => state.inventories);

export const selectTypeProduct = createSelector(selectData, (state: State) => state.productsType);

// Production Orders
export const selectProductionOrders = createSelector(selectData, (state: State) => state.productionOrders);
