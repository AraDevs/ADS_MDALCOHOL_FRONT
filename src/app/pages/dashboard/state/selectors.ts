import { DashboardState } from './reducer';
import { AppState } from '../../../state/app-state';
import { createSelector, props } from '@ngrx/store';

export const selectData = (state: AppState) => state.data;
export const selectSellers = createSelector(selectData, (state: DashboardState) => state.sellers);
export const selectSellersById = createSelector(
  selectData,
  (state: DashboardState, seller: number) => state.sellers.find((s) => s.id === seller)
);
export const selectDepartments = createSelector(
  selectData,
  (state: DashboardState) => state.departments
);

export const selectDepartmentByMunicipalityId = createSelector(
  selectData,
  (state: DashboardState, municipalityId: number) =>
    state.municipalities.find((m) => m.id === municipalityId).department
);

export const selectMunicipalities = createSelector(
  selectData,
  (state: DashboardState) => state.filterMunicipalities
);
export const selectMunicipalityById = createSelector(
  selectData,
  (state: DashboardState, municipalityId) =>
    state.municipalities.find((m) => m.id === municipalityId)
);

export const selectClients = createSelector(selectData, (state: DashboardState) => state.clients);
export const selectClientsActive = createSelector(
  selectData,
  (state: DashboardState) => state.clientsActive
);

export const selectTypePerson = createSelector(
  selectData,
  (state: DashboardState) => state.typesPerson
);

export const selectProviders = createSelector(
  selectData,
  (state: DashboardState) => state.providers
);
// export const selectProvidersActive = createSelector(selectData, (state: DashboardState) => state.providersActive);
export const selectProviderById = createSelector(
  selectData,
  (state: DashboardState, provider: number) => state.providers.find((s) => s.id === provider)
);

// Inventories
export const selectInventories = createSelector(
  selectData,
  (state: DashboardState) => state.inventories
);
export const selectInventoriesActive = createSelector(
  selectData,
  (state: DashboardState) => state.inventoriesActive
);
export const selectTypeProduct = createSelector(
  selectData,
  (state: DashboardState) => state.productsType
);
export const selectRawMaterials = createSelector(
  selectData,
  (state: DashboardState) => state.rawMaterials
);
export const selectFinalMaterials = createSelector(
  selectData,
  (state: DashboardState) => state.finalMaterials
);

// Production Orders
export const selectProductionOrders = createSelector(
  selectData,
  (state: DashboardState) => state.productionOrders
);

// Bills
export const selectBills = createSelector(selectData, (state: DashboardState) => state.bills);
export const selectPaymentType = createSelector(
  selectData,
  (state: DashboardState) => state.paymentType
);

export const selectBillType = createSelector(selectData, (state: DashboardState) => state.billType);

// Purchases
export const selectPurchases = createSelector(
  selectData,
  (state: DashboardState) => state.purchases
);
