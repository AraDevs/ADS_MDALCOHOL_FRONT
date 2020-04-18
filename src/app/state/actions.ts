import { createAction, props } from '@ngrx/store';
import { ActionMetadata, ErrorActionData } from '@shared/types';

export const LOAD_SELLERS = createAction('Load Sellers');
export const SELLERS_LOADED_SUCCESS = createAction(
  'Sellers Loaded Success',
  props<{ payload: any[] }>()
);
export const SELLERS_LOADED_FAIL = createAction(
  'Sellers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Clients
export const LOAD_CLIENTS = createAction('Load Clients');
export const CLIENTS_LOADED_SUCCESS = createAction(
  'Clients Loaded Success',
  props<{ payload: any[] }>()
);
export const CLIENTS_LOADED_FAIL = createAction(
  'Clients Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const LOAD_CLIENTS_ACTIVE = createAction('Load Clients Active');
export const CLIENTS_ACTIVE_LOADED_SUCCESS = createAction(
  'Clients Active Loaded Success',
  props<{ payload: any[] }>()
);
export const CLIENTS_ACTIVE_LOADED_FAIL = createAction(
  'Clients Active Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Departments
export const LOAD_DEPARTMENTS = createAction('Load Departments');
export const DEPARTMENTS_LOADED_SUCCESS = createAction(
  'Departments Loaded Success',
  props<{ payload: any[] }>()
);
export const DEPARTMENTS_LOADED_FAIL = createAction(
  'Departments Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Municipalities
export const LOAD_MUNICIPALITIES = createAction('Load Municipalities');
export const MUNICIPALITIES_LOADED_SUCCESS = createAction(
  'Municipalities Loaded Success',
  props<{ payload: any[] }>()
);
export const MUNICIPALITIES_LOADED_FAIL = createAction(
  'Municipalities Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const FILTER_MUNICIPALITIES = createAction(
  'Filter Municipalities',
  props<{
    payload: {
      id: number;
    };
  }>()
);

// Providers
export const LOAD_PROVIDERS = createAction('Load Providers');
export const PROVIDERS_LOADED_SUCCESS = createAction(
  'Providers Loaded Success',
  props<{ payload: any[] }>()
);
export const PROVIDERS_LOADED_FAIL = createAction(
  'Providers Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Inventories
export const LOAD_INVENTORIES = createAction('Load Inventories');
export const INVENTORIES_LOADED_SUCCESS = createAction(
  'Inventories Loaded Success',
  props<{ payload: any[] }>()
);
export const INVENTORIES_LOADED_FAIL = createAction(
  'Inventories Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Production Orders
export const LOAD_PRODUCTION_ORDERS = createAction('Load Production Orders');
export const PRODUCTION_ORDERS_LOADED_SUCCESS = createAction(
  'Production Orders Loaded Success',
  props<{ payload: any[] }>()
);
export const PRODUCTION_ORDERS_LOADED_FAIL = createAction(
  'Production Orders Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

// Bills
export const LOAD_BILLS = createAction('Load Bills', props<{ payload: ActionMetadata }>());
export const BILLS_LOADED_SUCCESS = createAction(
  'Bills Loaded Success',
  props<{ payload: any[] }>()
);
export const BILLS_LOADED_FAIL = createAction(
  'Bills Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const LOAD_INVENTORY_BY_CLIENT = createAction(
  'Load Inventory By Client',
  props<{ payload: ActionMetadata }>()
);
export const INVENTORY_BY_CLIENT_LOADED_SUCCESS = createAction(
  'Inventory By Client Loaded Success',
  props<{ payload: any[] }>()
);
export const INVENTORY_BY_CLIENT_LOADED_FAIL = createAction(
  'Inventory By Client Loaded Fail',
  props<{ payload: ErrorActionData }>()
);

export const CLEAR_INVENTORY_BY_CLIENT = createAction('Clear Inventory By Client');
