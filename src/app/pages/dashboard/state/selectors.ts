import { SharedState } from './reducer';
import { AppState } from '../../../state/app-state';
import { createSelector, props } from '@ngrx/store';

export const selectData = (state: AppState) => state.sharedState;
export const selectSellers = createSelector(selectData, (state: SharedState) => state.sellers);
export const selectSellersById = createSelector(
  selectData,
  (state: SharedState, seller: number) => state.sellers.find((s) => s.id === seller)
);
export const selectDepartments = createSelector(
  selectData,
  (state: SharedState) => state.departments
);

export const selectDepartmentByMunicipalityId = createSelector(
  selectData,
  (state: SharedState, municipalityId: number) =>
    state.municipalities.find((m) => m.id === municipalityId).department
);

export const selectMunicipalities = createSelector(
  selectData,
  (state: SharedState) => state.filterMunicipalities
);
export const selectMunicipalityById = createSelector(
  selectData,
  (state: SharedState, municipalityId) =>
    state.municipalities.find((m) => m.id === municipalityId)
);

export const selectClients = createSelector(selectData, (state: SharedState) => state.clients);
export const selectClientsActive = createSelector(
  selectData,
  (state: SharedState) => state.clientsActive
);

export const selectTypePerson = createSelector(
  selectData,
  (state: SharedState) => state.typesPerson
);

export const selectProviders = createSelector(
  selectData,
  (state: SharedState) => state.providers
);
// export const selectProvidersActive = createSelector(selectData, (state: DashboardState) => state.providersActive);
export const selectProviderById = createSelector(
  selectData,
  (state: SharedState, provider: number) => state.providers.find((s) => s.id === provider)
);

// Inventories
export const selectInventories = createSelector(
  selectData,
  (state: SharedState) => state.inventories
);
export const selectInventoriesActive = createSelector(
  selectData,
  (state: SharedState) => state.inventoriesActive
);
export const selectTypeProduct = createSelector(
  selectData,
  (state: SharedState) => state.productsType
);
export const selectRawMaterials = createSelector(
  selectData,
  (state: SharedState) => state.rawMaterials
);
export const selectFinalMaterials = createSelector(
  selectData,
  (state: SharedState) => state.finalMaterials
);

export const selectFinalProducts = createSelector(
  selectData,
  (state: SharedState) => state.finalProducts
);

// Production Orders
export const selectProductionOrders = createSelector(
  selectData,
  (state: SharedState) => state.productionOrders
);

// Bills
export const selectBills = createSelector(selectData, (state: SharedState) => state.bills);
export const selectPaymentType = createSelector(
  selectData,
  (state: SharedState) => state.paymentType
);

export const selectBillType = createSelector(selectData, (state: SharedState) => state.billType);

// Purchases
export const selectPurchases = createSelector(
  selectData,
  (state: SharedState) => state.purchases
);
