import { PurchaseTableConfiguration } from './purchase-table-configuration';
import { TotalPurchaseService } from './total.service';
import { PurchaseTableService } from './purchase-table.service';

export const PURCHASE_TABLE_PROVIDERS = [
  PurchaseTableConfiguration,
  TotalPurchaseService,
  PurchaseTableService,
];
