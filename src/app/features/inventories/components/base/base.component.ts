import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/services';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';

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
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.dataInventories$ = this.store$.pipe(select(globalState.selectInventories));
    this.loadingInventories$ = this.loading.getLoading([
      globalState.LOAD_INVENTORIES,
      globalState.INVENTORIES_LOADED_SUCCESS,
      globalState.INVENTORIES_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_INVENTORIES());
    this.store$.dispatch(globalState.LOAD_PROVIDERS());
  }

  update(inventory: any) {
    this.createModalForm()
      .pipe(
        switchMap(result => {
          return combineLatest([of(result)]);
        }),
        map(([result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { inventory };
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
