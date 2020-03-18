import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService } from '@shared/services';
import { SelectService } from '@core/services';
import * as globalState from '@state/index';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  dataOrders: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['inventoryName', 'quantity', 'start_date', 'end_date', 'exp_date', 'workers', 'actions'],
    titles: {
      inventoryName: 'ProductionOrders.Table.Titles.Name',
      quantity: 'ProductionOrders.Table.Titles.Quantity',
      start_date: 'ProductionOrders.Table.Titles.StartDate',
      end_date: 'ProductionOrders.Table.Titles.EndDate',
      exp_date: 'ProductionOrders.Table.Titles.ExpDate',
      workers: 'ProductionOrders.Table.Titles.Workers',
      actions: 'Acciones'
    },
    keys: ['name', 'quantity', 'start_date', 'end_date', 'exp_date', 'workers', 'actions']
  };

  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
    this.dataOrders = this.store$.pipe(select(globalState.selectProductionOrders));
  }

}
