import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService, LoadingService } from '@shared/services';
import { SelectService } from '@core/services';
import * as globalState from '@state/index';
import { FormComponent } from '@features/production-orders/components/form/form.component';
import { filter, switchMap, map } from 'rxjs/operators';
import { MODAL_INITIAL_EVENT } from '../../../../shared/constants/index';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit {

  dataOrders: Observable<any[]>;
  dataInvetories: Observable<any[]>;
  loadingProductions$: Observable<boolean>;

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
    keys: ['inventory.name', 'quantity', 'start_date', 'end_date', 'exp_date', 'workers', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingProductions$ = this.loading.getLoading([
      globalState.LOAD_PRODUCTION_ORDERS,
      globalState.PRODUCTION_ORDERS_LOADED_SUCCESS,
      globalState.PRODUCTION_ORDERS_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_PRODUCTION_ORDERS());
    this.store$.dispatch(globalState.LOAD_INVENTORIES());
    this.dataInvetories = this.store$.pipe(select(globalState.selectInventories));
    this.dataOrders = this.store$.pipe(select(globalState.selectProductionOrders));
  }

  update(productionOrder: any) {
    this.createFormModal()
      .pipe(switchMap(result => {
        return combineLatest([of(result)]);
      }),
      map(([result]) => {
        if (result.event !== MODAL_INITIAL_EVENT) {
          return { result };
        }
        const data = { productionOrder };
        return { data, result };
      })
      )
      .subscribe(({ data, result }) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event, data });
      });
  }

  add() {
    this.createFormModal()
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
    });
  }

  private createFormModal() {
    return this.modalFactory.create({ component: FormComponent, title: 'ProductionOrders.Modal.Title' });
  }
}
