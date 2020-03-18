import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export interface State {
  departments: any[];
  municipalities: any[];
  clients: any[];
  products: any[];
  sellers: any[];
  providers: any[];
  filterMunicipalities: any[];
  typesPerson: string[];
  inventories: any[];
  productsType: string[];
}

const INITIAL_STATE: State = {
  departments: [],
  municipalities: [],
  clients: [],
  products: [],
  sellers: [],
  providers: [],
  filterMunicipalities: [],
  typesPerson: ['Natural', 'Jurídica'],
  inventories: [],
  productsType: ['Materia prima', 'Producto final']
};

const globalReducer = createReducer(
  INITIAL_STATE,
  on(actions.SELLERS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(obj => ({ ...obj, state: obj.state === 1 ? 'Activo' : 'Inactivo' }));
    return { ...state, sellers: data };
  }),
  on(actions.DEPARTMENTS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(department => {
      return { ...department, label: department.name };
    });
    return { ...state, departments: data };
  }),
  on(actions.MUNICIPALITIES_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(municipality => {
      return { ...municipality, label: municipality.name };
    });
    return { ...state, municipalities: data };
  }),
  on(actions.CLIENTS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(client => {
      return { ...client, partnerName: client.seller.name };
    });
    return { ...state, clients: data };
  }),
  on(actions.FILTER_MUNICIPALITIES, (state, { payload }) => {
    const { id } = payload;
    const data = state.municipalities.filter(municipality => municipality.department.id === id);
    return { ...state, filterMunicipalities: data };
  }),
  on(actions.PROVIDERS_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(obj => ({ ...obj, state: obj.state === 1 ? 'Activo' : 'Inactivo' }));
    return { ...state, providers: data };
  }),
  on(actions.INVENTORIES_LOADED_SUCCESS, (state, { payload }) => {
    const data = payload.map(inventory => {
      return { ...inventory, name: inventory.name };
    });
    return { ...state, inventories: data };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return globalReducer(state, action);
}
