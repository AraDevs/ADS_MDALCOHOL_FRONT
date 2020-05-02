import { Component, OnInit } from '@angular/core';
import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { DataTableConfig, ModalData } from '@shared/types';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import {
  LoadingService,
  ModalFactoryService,
  SuccessService,
  ErrorService,
} from '@shared/services';
import * as globalState from '@dashboard-state/index';
import { FormComponent } from '../form/form.component';
import { filter } from 'rxjs/operators';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { MessageService } from '@core/services/message.service';
import Swal from 'sweetalert2';
import * as state from '../../state/actions';
import { LoadPurchasesService } from '../../services/load-purchases.service';
import { PurchaseDetailComponent } from '../purchase-detail/purchase-detail.component';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService, SuccessService, ErrorService],
})
export class BaseComponent implements OnInit {
  private purchase: any = null;
  private purchaseState$ = new BehaviorSubject<'' | 'active' | 'deleted'>('deleted');

  dataPurchases$: Observable<any[]>;
  loadingPurchases$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['id', 'purchase_date', 'payment_type', 'perception', 'actions'],
    titles: {
      id: 'Purchase.Table.Id',
      purchase_date: 'Purchase.Table.PurchaseDate',
      payment_type: 'Purchase.Table.PaymentType',
      perception: 'Purchase.Table.Perception',
      actions: 'Table.Actions',
    },
    keys: ['id', 'purchase_date', 'payment_type', 'perception', 'Tabla.Actions'],
  };

  constructor(
    private store$: Store<AppState>,
    private loadPurchasesService: LoadPurchasesService,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService,
    private message: MessageService,
    private successService: SuccessService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadingPurchases$ = this.loading.getLoading([
      globalState.LOAD_PURCHASE,
      globalState.PURCHASE_LOADED_SUCCESS,
      globalState.PURCHASE_LOADED_FAIL,
    ]);

    this.dataPurchases$ = this.loadPurchasesService.getPuschases();

    // Purchase is deleted
    this.successService.success(state.UPDATE_PURCHASES_SUCCESS, () => {
      this.purchaseState$.next(this.purchaseState$.value);
      this.purchase.message.success('Messages.Update.Success');
    });
    this.errorService.error(state.UPDATE_PURCHASES_FAIL, () => {
      this.message.error('Messages.ErrorDeletePurchase', 'Error al eliminar factura');
    });
  }

  add() {
    const title = 'Purchase.Modal.Titles.FormModal';
    this.createModalForm({
      component: FormComponent,
      title,
      panelClass: ['md-modal-form-purchase'],
    })
      .pipe(filter((result) => result.event !== MODAL_INITIAL_EVENT))
      .subscribe((result) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  delete(row: any) {
    this.message.messageWarning('Messages.DeletePurchase').then((result) => {
      const id = { id: row.id };
      if (result.dismiss !== Swal.DismissReason.cancel) {
        this.store$.dispatch(state.UPDATE_PURCHASES({ payload: { data: id } }));
      }
    });
  }

  detail(row: any) {
    const title = 'Purchase.Modal.Titles.PurchaseDetail';
    const configutation = {
      component: PurchaseDetailComponent,
      title,
      displayAcceptButton: false,
    };

    this.createModalForm(configutation).subscribe((result) => {
      const component = result.modal.componentInstance.getRenderedComponent<
        PurchaseDetailComponent
      >();
      component.execute(row.id);
    });
  }

  loadPurchases(filterValue: string) {
    this.loadPurchasesService.loadPurchases(filterValue as any);
  }

  hideDeleteIcon(row: any) {
    return row.state === 0;
  }

  private createModalForm(data: ModalData) {
    return this.modalFactory.create(data);
  }
}
