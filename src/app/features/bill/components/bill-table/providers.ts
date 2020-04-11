import { BillTableConfiguration } from './bill-table-configuration';
import { TotalBillService } from './total.service';
import { BillTableService } from './bill-table.service';

export const billTableProviders = [BillTableConfiguration, TotalBillService, BillTableService];
