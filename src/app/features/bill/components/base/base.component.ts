import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService, LoadingService, SuccessService, ErrorService } from '@shared/services';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import * as globalState from '@state/index';
import * as state from '@features/bill/state';

import { Observable } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { MessageService } from '@core/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService, SuccessService, ErrorService],
})
export class BaseComponent implements OnInit {
  private bill: any = null;

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
    private loading: LoadingService,
    private message: MessageService,
    private successService: SuccessService,
    private errorService: ErrorService
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

    this.store$.pipe(select(state.selectBillDetail)).subscribe((res) => {
      console.log(res, 'DETAIL');
    });

    // bill is deleted
    this.successService.success(state.UPDATE_BILLS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_BILLS());
      this.message.success('Messages.Update.Success');
    });
    this.errorService.error(state.UPDATE_BILLS_FAIL, () => {
      this.message.error('Messages.ErrorDeleteBill', 'Error al eliminar factura');
    });
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
    this.message.messageWarning('Messages.DeleteBill').then((result) => {
      const id = { id: row.id };
      console.log(id);
      if (result.dismiss !== Swal.DismissReason.cancel) {
        this.store$.dispatch(state.UPDATE_BILLS({ payload: { data: id }}));
      }
    });
  }

  detail(row: any) {
    const metadata = { resource: { id: row.id } };
    this.store$.dispatch(state.LOAD_BILL_DETAIL({ payload: { metadata } }));
  }

  private createModalForm() {
    return this.modalFactory.create({
      component: FormComponent,
      title: 'Bill.Modal.Titles.FormModal',
    });
  }
}
