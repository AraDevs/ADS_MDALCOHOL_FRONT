import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService } from '@shared/services';
import { SelectService } from '@core/services';
import * as globalState from '@state/index';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { filter, switchMap, map } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  dataInventories: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'price', 'stock', 'type', 'actions'],
    titles: {
      name: 'Inventories.Table.Title.Name',
      price: 'Inventories.Table.Title.Price',
      stock: 'Inventories.Table.Title.Stock',
      type: 'Inventories.Table.Title.Type',
      actions: 'Inventories.Table.Title.Actions'
    },
    keys: ['name', 'price', 'stock', 'type', 'actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private selectData: SelectService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(globalState.LOAD_INVENTORIES());
    this.dataInventories = this.store$.pipe(select(globalState.selectInventories));
  }

  update(inventory: any) {
    this.modalFactory
      .create({ component: FormComponent })
      .pipe(switchMap(result => {
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
    this.modalFactory
      .create({ component: FormComponent })
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }
}
