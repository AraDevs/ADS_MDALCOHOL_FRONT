export interface DataTableConfig {
  displayedColumns: string[];
  titles: { [column: string]: any };
  sortActiveColumn?: string;
  sortDirection?: 'desc' | 'asc';
  keys?: string[]
}
