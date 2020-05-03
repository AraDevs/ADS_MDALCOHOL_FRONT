import * as dashboardState from '@dashboard-state/index';

const SALES_BY_CLIENT = 'SALES_BY_CLIENT';
const SALES_BY_SELLER = 'SALES_BY_SELLER';
const SALES_BY_PRODUCT = 'SALES_BY_PRODUCT';
const SALES_BY_ZONE = 'SALES_BY_ZONE';
const DELETED_BILLS = 'DELETED:BILLS';

export const REPORT_TYPES = {
  SALES_BY_CLIENT: { label: 'Ventas por cliente', value: SALES_BY_CLIENT },
  SALES_BY_SELLER: { label: 'Ventas por vendedor', value: SALES_BY_SELLER },
  SALES_BY_PRODUCT: { label: 'Ventas por producto', value: SALES_BY_PRODUCT },
  SALES_BY_ZONE: { label: 'Ventas por zona', value: SALES_BY_ZONE },
  DELETED_BILLS: { label: 'Facturas eliminadas', value: DELETED_BILLS },
};

export const SELECTORS = {
  [SALES_BY_CLIENT]: dashboardState.selectClientsActive,
  [SALES_BY_SELLER]: dashboardState.selectSellers,
  [SALES_BY_PRODUCT]: dashboardState.selectInventoriesActive,
  [SALES_BY_ZONE]: dashboardState.selectDepartments,
};

export const MAPPERS = {
  [SALES_BY_CLIENT]: (client: any) => ({
    ...client,
    label: client.business_name,
    value: client.id,
  }),
  [SALES_BY_SELLER]: (seller: any) => ({ ...seller, label: seller.name, value: seller.id }),
  [SALES_BY_PRODUCT]: (inventory: any) => ({
    ...inventory,
    label: inventory.name,
    value: inventory.id,
  }),
};
