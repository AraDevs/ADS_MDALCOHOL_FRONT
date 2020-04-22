import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import * as moment from 'moment';

export interface State {
  departments: any[];
  municipalities: any[];
  clients: any[];
  clientsActive: any[];
  products: any[];
  rawMaterials: any[];
  finalMaterials: any[];
  sellers: any[];
  providers: any[];
  filterMunicipalities: any[];
  typesPerson: string[];
  inventories: any[];
  inventoriesActive: any[];
  productsType: string[];
  productionOrders: any[];
  bills: any[];
  paymentType: string[];
  billType: string[];
  purchases: any[];
}

const INITIAL_STATE: State = {
  departments: [],
  municipalities: [],
  clients: [],
  clientsActive: [],
  products: [],
  rawMaterials: [],
  finalMaterials: [],
  sellers: [],
  providers: [],
  filterMunicipalities: [],
  typesPerson: ['Natural', 'Jurídica'],
  inventories: [],
  inventoriesActive: [],
  productsType: ['Materia prima', 'Producto final'],
  productionOrders: [],
  bills: [],
  paymentType: ['Contado', 'Crédito'],
  billType: ['Consumidor final', 'Crédito fiscal', 'Notas de crédito', 'Notas de débito'],
  purchases: []
};

const globalReducer = createReducer(
  INITIAL_STATE,
  on(actions.SELLERS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((obj) => ({ ...obj, state: obj.state === 1 ? 'Activo' : 'Inactivo' }));
    return { ...state, sellers: data };
  }),
  on(actions.DEPARTMENTS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((department) => {
      return { ...department, label: department.name };
    });
    return { ...state, departments: data };
  }),
  on(actions.MUNICIPALITIES_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((municipality) => {
      return { ...municipality, label: municipality.name };
    });
    return { ...state, municipalities: data };
  }),
  on(actions.CLIENTS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((client) => {
      return { ...client, partnerName: client.seller.name };
    });
    return { ...state, clients: data };
  }),
  on(actions.CLIENTS_ACTIVE_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((client) => {
      return { ...client, partnerName: client.seller.name };
    });
    return { ...state, clientsActive: data };
  }),
  on(actions.FILTER_MUNICIPALITIES, (state, { payload }) => {
    const { id } = payload;
    const data = state.municipalities.filter((municipality) => municipality.department.id === id);
    return { ...state, filterMunicipalities: data };
  }),
  on(actions.PROVIDERS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((obj) => ({ ...obj, state: obj.partner.state === 1 ? 'Activo' : 'Inactivo' }));
    return { ...state, providers: data };
  }),
  on(actions.INVENTORIES_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((inventory) => {
      return { ...inventory, name: inventory.name };
    });
    return { ...state, inventories: data };
  }),
  on(actions.RAW_MATERIALS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((inventory) => {
      return { ...inventory, name: inventory.name };
    });
    return { ...state, rawMaterials: data };
  }),
  on(actions.FINAL_MATERIALS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((inventory) => {
      return { ...inventory, name: inventory.name };
    });
    return { ...state, finalMaterials: data };
  }),
  on(actions.INVENTORY_BY_CLIENT_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((inventory) => {
      return { ...inventory, name: inventory.name };
    });
    return { ...state, inventoriesActive: data };
  }),
  on(actions.CLEAR_INVENTORY_BY_CLIENT, (state) => {
    return { ...state, inventoriesActive: [] };
  }),

  on(actions.PRODUCTION_ORDERS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map((productionOrder) => {
      return { ...productionOrder, inventoryName: productionOrder.inventory.name };
    });
    return { ...state, productionOrders: data };
  }),
  on(actions.BILLS_LOADED_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      bills: payload.map((bill) => ({
        ...bill,
        customState: bill.state === 1 ? 'Activo' : 'Eliminado',
        bill_date: moment(bill.bill_date).format('DD-MM-YYYY')
      })),
    };
  }),
  on(actions.PURCHASE_LOADED_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      purchases: payload.map((purchase) => ({
        ...purchase,
        customState: purchase.state === 1 ? 'Activo' : 'Eliminado',
        perception: purchase.perception === 1 ? 'Con Percepción' : 'Sin Percepción',
        purchase_date: moment(purchase.purchase_date).format('DD-MM-YYYY')
      })),
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
