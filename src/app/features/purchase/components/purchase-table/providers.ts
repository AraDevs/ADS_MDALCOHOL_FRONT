import { PurchaseTableConfiguration } from './purchase-table-configuration';
import { TotalBillService } from './total.service';
import { PurchaseTableService } from './purchase-table.service';

export const billTableProviders = [
  PurchaseTableConfiguration,
  TotalBillService,
  PurchaseTableService,
];
