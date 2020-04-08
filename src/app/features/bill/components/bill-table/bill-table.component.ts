import { Component, OnInit } from '@angular/core';
import { DataTableConfig } from '@shared/types';
import { BehaviorSubject } from 'rxjs';
import { FieldType } from '@core/types/forms/control-config';

interface ControlDataTableConfig extends DataTableConfig {
  controls: { [column: string]: FieldType | 'Text' };
}

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
})
export class BillTableComponent implements OnInit {
  source$ = new BehaviorSubject([{ product: {}, quantity: 20, price: 20, total: 20 }]);

  config: ControlDataTableConfig = {
    displayedColumns: ['product', 'quantity', 'price', 'total', 'actions'],
    titles: {
      product: 'Bill.FormTable.Product',
      quantiry: 'Bill.FormTable.Quantity',
      price: 'Bill.FormTable.Price',
      total: 'Bill.FormTable.Total',
      actions: 'Bill.FormTable.Actions',
    },
    controls: {
      product: 'Select',
      quantiry: 'Input',
      price: 'Input',
      total: 'Text',
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
