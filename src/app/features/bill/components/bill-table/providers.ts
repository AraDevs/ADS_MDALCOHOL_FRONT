import { BillTableConfiguration } from './bill-table-configuration';
import { TotalBillService } from './total.service';
import { BillTableService } from './bill-table.service';

export const BILL_TABLE_PROVIDERS = [BillTableConfiguration, TotalBillService, BillTableService];
