import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService, LoadingService } from '@shared/services';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import * as globalState from '@state/index';
import { Observable } from 'rxjs';
import { DataTableConfig } from '@shared/types';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService],
})
export class BaseComponent implements OnInit {
  dataClients: Observable<any[]>;
  dataBills: Observable<any[]>;
  loadingBills$: Observable<boolean>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['id', 'business_name', 'bill_date', 'payment_type', 'bill_type', 'actions'],
    titles: {
      id: 'Bill.Table.Titles.Num',
      business_name: 'Bill.Table.Titles.BusinessName',
      bill_date: 'Bill.Table.Titles.BillDate',
      payment_type: 'Bill.Table.Titles.PaymentType',
      bill_type: 'Bill.Table.Titles.BillType',
      actions: 'Acciones',
    },
    keys: ['id', 'client.business_name', 'bill_date', 'payment_type', 'bill_type', 'Tabla.Actions'],
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingBills$ = this.loading.getLoading([
      globalState.LOAD_BILLS,
      globalState.BILLS_LOADED_SUCCESS,
      globalState.BILLS_LOADED_FAIL,
    ]);
    this.store$.dispatch(globalState.LOAD_CLIENTS_ACTIVE());
    this.store$.dispatch(globalState.LOAD_BILLS());
    this.dataBills = this.store$.pipe(select(globalState.selectBills));
  }

  add() {
    this.createModalForm()
      .pipe(filter((result) => result.event !== MODAL_INITIAL_EVENT))
      .subscribe((result) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  delete(row: any) {
    console.log(row);
  }

  detail(row: any) {
    console.log(row);
  }

  private createModalForm() {
    return this.modalFactory.create({
      component: FormComponent,
      title: 'Bill.Modal.Titles.FormModal',
    });
  }
}
