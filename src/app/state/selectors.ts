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
export const selectClientsActive = createSelector(selectData, (state: State) => state.clientsActive);

export const selectTypePerson = createSelector(selectData, (state: State) => state.typesPerson);

export const selectProviders = createSelector(selectData, (state: State) => state.providers);
// export const selectProvidersActive = createSelector(selectData, (state: State) => state.providersActive);
export const selectProviderById = createSelector(selectData,
    (state: State, provider: number) => state.providers.find((s) => s.id === provider));

// Inventories
export const selectInventories = createSelector(selectData, (state: State) => state.inventories);
export const selectInventoriesActive = createSelector(selectData, (state: State) => state.inventoriesActive);
export const selectTypeProduct = createSelector(selectData, (state: State) => state.productsType);
export const selectRawMaterials = createSelector(selectData, (state: State) => state.rawMaterials);
export const selectFinalMaterials = createSelector(selectData, (state: State) => state.finalMaterials);


// Production Orders
export const selectProductionOrders = createSelector(selectData, (state: State) => state.productionOrders);

// Bills
export const selectBills = createSelector(selectData, (state: State) => state.bills);
export const selectPaymentType = createSelector(selectData, (state: State) => state.paymentType);

export const selectBillType = createSelector(selectData, (state: State) => state.billType);

// Purchases
export const selectPurchases = createSelector(selectData, (state: State) => state.purchases);
