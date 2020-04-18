import { Component, OnInit } from '@angular/core';
import { MessageService } from '@core/services/message.service';
import * as state from '@features/bill/state';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import {
  ErrorService,
  LoadingService,
  ModalFactoryService,
  SuccessService,
} from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';
import { FormComponent } from '../form/form.component';
import { LoaddBillsService } from '@features/bill/services/load-bills.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService, SuccessService, ErrorService],
})
export class BaseComponent implements OnInit {
  private bill: any = null;
  private billState$ = new BehaviorSubject<'' | 'active' | 'deleted'>('deleted');

  dataClients: Observable<any[]>;
  bills$: Observable<any[]>;
  filter = new FormControl();

  loadingBills$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: [
      'id',
      'business_name',
      'bill_date',
      'payment_type',
      'bill_type',
      'state',
      'actions',
    ],
    titles: {
      id: 'Bill.Table.Titles.Num',
      business_name: 'Bill.Table.Titles.BusinessName',
      bill_date: 'Bill.Table.Titles.BillDate',
      payment_type: 'Bill.Table.Titles.PaymentType',
      bill_type: 'Bill.Table.Titles.BillType',
      state: 'Bill.Table.Titles.State',
      actions: 'Bill.Table.Titles.Actions',
    },
    keys: ['id', 'client.business_name', 'bill_date', 'payment_type', 'bill_type', 'customState'],
  };

  constructor(
    private store$: Store<AppState>,
    private loadBills: LoaddBillsService,
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

    this.bills$ = this.loadBills.getBills(this.filter.valueChanges.pipe(startWith('')));

    // bill is deleted
    this.successService.success(state.UPDATE_BILLS_SUCCESS, () => {
      this.billState$.next(this.billState$.value);
      this.bill.this.message.success('Messages.Update.Success');
    });
    this.errorService.error(state.UPDATE_BILLS_FAIL, () => {
      this.message.error('Messages.ErrorDeleteBill', 'Error al eliminar factura');
    });
  }

  add() {
    const title = 'Bill.Modal.Titles.FormModal';
    this.createModalForm(FormComponent, title)
      .pipe(filter((result) => result.event !== MODAL_INITIAL_EVENT))
      .subscribe((result) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  delete(row: any) {
    this.message.messageWarning('Messages.DeleteBill').then((result) => {
      const id = { id: row.id };
      if (result.dismiss !== Swal.DismissReason.cancel) {
        this.store$.dispatch(state.UPDATE_BILLS({ payload: { data: id } }));
      }
    });
  }

  detail(row: any) {
    const title = 'Bill.Modal.Titles.BillDetail';
    this.createModalForm(BillDetailComponent, title, false).subscribe((result) => {
      const component = result.modal.componentInstance.getRenderedComponent<BillDetailComponent>();
      component.execute(row.id);
    });
  }

  hideDeleteIcon(row: any) {
    return row.state === 0;
  }

  private createModalForm(component: any, title: string, displayAcceptButton = true) {
    return this.modalFactory.create({
      component,
      title,
      displayAcceptButton,
    });
  }
}
