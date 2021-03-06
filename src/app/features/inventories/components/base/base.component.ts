import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/services';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as dashboardState from '@dashboard-state/index';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { SelectService } from '@core/services';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnInit {
  dataInventories$: Observable<any[]>;
  loadingInventories$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'price', 'stock', 'type', 'actions'],
    titles: {
      name: 'Inventories.Table.Title.Name',
      price: 'Inventories.Table.Title.Price',
      stock: 'Inventories.Table.Title.Stock',
      type: 'Inventories.Table.Title.Type',
      actions: 'Inventories.Table.Title.Actions'
    },
    keys: ['name', 'price', 'stock', 'type', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private selectData: SelectService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.dataInventories$ = this.store$.pipe(select(dashboardState.selectInventories));
    this.loadingInventories$ = this.loading.getLoading([
      dashboardState.LOAD_INVENTORIES,
      dashboardState.INVENTORIES_LOADED_SUCCESS,
      dashboardState.INVENTORIES_LOADED_FAIL
    ]);

    this.store$.dispatch(dashboardState.LOAD_INVENTORIES());
    this.store$.dispatch(dashboardState.LOAD_PROVIDERS());
  }

  update(inventory: any) {
    let provider$ = inventory.raw_material !== null ? this.selectData.getProviderById(inventory.raw_material.provider.id) : of({});

    this.createModalForm()
      .pipe(
        switchMap(result => {
          return combineLatest([provider$, of(result)]);
        }),
        map(([provider, result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { inventory, provider };
          return { data, result };
        })
      )
      .subscribe(({ data, result }) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event, data });
      });
  }

  add() {
    this.createModalForm()
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  private createModalForm() {
    return this.modalFactory.create({ component: FormComponent, title: 'Inventories.Modal.Title' });
  }
}
