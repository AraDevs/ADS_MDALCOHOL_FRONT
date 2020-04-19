import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormModel } from '@features/purchase/config/form-model';
import { MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT, DYNAMIC_MODAL_DATA } from '@shared/constants';
import { FormGroup } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Subject, Observable, BehaviorSubject, merge } from 'rxjs';
import { FormService } from '@features/purchase/components/form/form.service';
import { MessageService } from '@core/services/message.service';
import { FactoryFormService } from '@core/services';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import * as state from '@features/purchase/state';
import { PurchaseTableComponent } from '../purchase-table/purchase-table.component';
import { SuccessService, ErrorService } from '@shared/services';
import { tap, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { LoadPurchasesService } from '@features/purchase/services/load-purchases.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, FormService, SuccessService, ErrorService]
})
export class FormComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private errors = new Subject<string[]>();
  private update = false;
  private purchase: any;

  private _computePerception$ = new BehaviorSubject(false);

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();
  products$: Observable<any[]>;
  providers$: Observable<any[]>;

  computePerception$ = this._computePerception$.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(PurchaseTableComponent) purchaseTable: PurchaseTableComponent;
  constructor(
    private store$: Store<AppState>,
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private successService: SuccessService,
    private errorService: ErrorService,
    private formService: FormService,
    private message: MessageService,
    private loadPurchases: LoadPurchasesService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.store$.dispatch(globalState.LOAD_PROVIDERS());
    this.store$.dispatch(globalState.LOAD_RAW_MATERIALS());

    this.providers$ = this.getProviders();
    this.products$ = this.getProducts();
    this.computePerceptions();
    this.successService.success(state.SAVE_PURCHASES_SUCCESS, () => {
      this.loadPurchases.reload();
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });
    this.errorService.error(state.SAVE_PURCHASES_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getPurchaseDTO(values);
      if (this.update) {
        const action = state.UPDATE_PURCHASES({
          payload: { data: { ...data, id: this.purchase.id }}
        });
        this.store$.dispatch(action);
      } else {
        console.log(data);
        const items = this.purchaseTable.getValues();
        const action = state.SAVE_PURCHASES({ payload: { data: { ...data }}});
        this.store$.dispatch(action);
      }
    } else {
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.purchase = this.formService.getPurchase(data);
        this.form.patchValue(this.purchase);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }

  private computePerceptions() {
    this.subs.sink = this.form
      .get('perception')
      .valueChanges.pipe(tap((compute) => this._computePerception$.next(compute))).subscribe();
  }

  private getProviders() {
    return this.store$.pipe(select(globalState.selectProviders),
      map((providers) => providers.filter((provider) => provider.state === 'Activo')),
      map((providers) => providers.map((provider) => ({ ...provider, label: provider.partner.name }))));
  }

  private getProducts() {
    return this.store$.pipe(select(globalState.selectRawMaterials),
      map((products) => products.filter((product) => product.state === 1)),
      map((products) => products.map((product) => ({ ...product, label: product.name }))));
  }
}
