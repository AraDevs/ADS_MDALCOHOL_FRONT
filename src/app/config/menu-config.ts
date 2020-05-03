import { PRODUCTION, ADMINISTRATION } from '@shared/constants';

export const MENU_ITEMS = {
  administrationRouteRedirect: 'bills',
  productionRouteRedirect: 'inventories',
  productions: [
    {
      title: 'SideNav.Inventories',
      route: 'inventories',
      icon: 'assignment',
      userType: PRODUCTION,
    },
    {
      title: 'SideNav.ProductionOrders',
      route: 'production-orders',
      icon: 'assignment_turned_in',
      userType: PRODUCTION,
    },
    {
      title: 'SideNav.Bill',
      route: 'bills',
      icon: 'monetization_on',
      userType: ADMINISTRATION,
    },
    {
      title: 'SideNav.Purchase',
      route: 'purchases',
      icon: 'payments',
      userType: ADMINISTRATION,
    },
    {
      title: 'SideNav.Reports',
      route: 'reports',
      icon: 'picture_as_pdf',
      userType: ADMINISTRATION,
    },
  ],
  catalogs: [
    {
      title: 'SideNav.Providers',
      route: 'providers',
      icon: 'home',
      userType: ADMINISTRATION,
    },
    {
      title: 'SideNav.Users',
      route: 'users',
      icon: 'account_circle',
      userType: ADMINISTRATION,
    },
    {
      title: 'SideNav.Clients',
      route: 'clients',
      icon: 'group',
      userType: ADMINISTRATION,
    },
    {
      title: 'SideNav.Sellers',
      route: 'sellers',
      icon: 'store',
      userType: ADMINISTRATION,
    },
  ],
};
