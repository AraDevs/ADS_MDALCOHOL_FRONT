import { FieldType } from '@core/types';

export interface DataTableConfig {
  displayedColumns: string[];
  titles: { [column: string]: any };
  sortActiveColumn?: string;
  sortDirection?: 'desc' | 'asc';
  keys?: string[];
}

export interface ControlDataTableConfig extends DataTableConfig {
  controls: { [column: string]: FieldType | 'Text' };
}
