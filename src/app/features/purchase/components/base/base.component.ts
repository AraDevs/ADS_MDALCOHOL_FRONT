import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { LoadingService, ModalFactoryService } from '@shared/services';
import * as globalState from '@state/index';
import { FormComponent } from '../form/form.component';
import { filter } from 'rxjs/operators';
import { MODAL_INITIAL_EVENT } from '@shared/constants';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit {
  dataPurchases: Observable<any[]>;
  loadingPurchases$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['id', 'purchase_date', 'payment_type', 'perception', 'actions'],
    titles: {
      id: 'Purchase.Table.Id',
      purchase_date: 'Purchase.Table.PurchaseDate',
      payment_type: 'Purchase.Table.PaymentType',
      perception: 'Purchase.Table.Perception',
      actions: 'Acciones'
    },
    keys: ['id', 'purchase_date', 'payment_type', 'perception', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingPurchases$ = this.loading.getLoading([
      globalState.LOAD_PURCHASE,
      globalState.PURCHASE_LOADED_SUCCESS,
      globalState.PURCHASE_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_PURCHASE());
    this.dataPurchases = this.store$.pipe(select(globalState.selectPurchases));
  }

  add() {
    const title = 'Purchase.Modal.Titles.FormModal';
    this.createModalForm(FormComponent, title)
      .pipe(filter((result) => result.event !== MODAL_INITIAL_EVENT))
      .subscribe((result) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  delete(row: any) {
    
  }

  private createModalForm(component: any, title: string, displayAcceptButton = true) {
    return this.modalFactory.create({
      component,
      title,
      displayAcceptButton
    });
  }
}
