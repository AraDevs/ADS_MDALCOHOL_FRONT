import { Component, OnInit } from '@angular/core';
import * as globalState from '@state/index';
import { select, Store } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { Observable, combineLatest, of } from 'rxjs';
import { AppState } from '@state/app-state';
import { ModalFactoryService, LoadingService } from '@shared/services';
import { FormComponent } from '../form/form.component';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit {
  dataSellers: Observable<any[]>;
  loadingSellers$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'seller_code', 'state', 'actions'],
    titles: {
      name: 'Sellers.Table.Name',
      seller_code: 'Sellers.Table.SellerCode',
      state: 'Sellers.Table.State',
      actions: 'Sellers.Table.Actions'
    },
    keys: ['name', 'seller_code', 'state', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingSellers$ = this.loading.getLoading([
      globalState.LOAD_SELLERS,
      globalState.SELLERS_LOADED_SUCCESS,
      globalState.SELLERS_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.dataSellers = this.store$.pipe(select(globalState.selectSellers));
  }

  update(seller: any) {
    this.createModalForm()
      .pipe(
        switchMap(result => {
          return combineLatest([of(result)]);
        }),
        map(([result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { seller };
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
    return this.modalFactory.create({ component: FormComponent, title: 'Sellers.Modal.Title' });
  }
}
