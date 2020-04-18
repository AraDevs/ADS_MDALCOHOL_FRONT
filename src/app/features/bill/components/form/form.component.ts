import { Component, ElementRef, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { MessageService } from '@core/services/message.service';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormService } from '@features/bill/components/form/form.service';
import { FormModel } from '@features/bill/config/form-model';
import * as state from '@features/bill/state';
import { select, Store } from '@ngrx/store';
import { DYNAMIC_MODAL_DATA, MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT } from '@shared/constants';
import { ErrorService, SuccessService } from '@shared/services';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { BillTableComponent } from '../bill-table/bill-table.component';
import { LoaddBillsService } from '@features/bill/services/load-bills.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, FormService, SuccessService, ErrorService],
})
export class FormComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  private errors = new Subject<string[]>();
  private update = false;
  private bill: any;

  private _computePerception$ = new BehaviorSubject(false);
  private _computeIVA$ = new BehaviorSubject(false);

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();
  products$: Observable<any[]>;

  computePerception$ = this._computePerception$.asObservable();
  computeIVA$ = this._computeIVA$.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(BillTableComponent) billTable: BillTableComponent;

  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private errorService: ErrorService,
    private formService: FormService,
    private message: MessageService,
    private loadBills: LoaddBillsService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
    this.products$ = this.store$.pipe(
      select(globalState.selectInventoriesActive),
      map((products) => {
        return products.map((product) => ({
          ...product,
          label: product.name,
          value: product.price,
        }));
      })
    );

    this.computeValues();

    this.subs.sink = this.form.get('clientId').valueChanges.subscribe((client) => {
      this.loadInventoriesByClient(client);
    });

    this.successService.success(state.SAVE_BILLS_SUCCESS, () => {
      this.loadBills.reload();
      this.message.success('Messages.Add.Success').then(() => this.data.modalRef.close());
    });

    this.errorService.error(state.SAVE_BILLS_FAIL, (payload: any) => {
      const { customErrorsServer } = payload;
      this.errors.next(customErrorsServer);
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getBillDTO(values);
      if (this.update) {
        const action = state.UPDATE_BILLS({
          payload: { data: { ...data, id: this.bill.id } },
        });
        this.store$.dispatch(action);
      } else {
        const items = this.billTable.getValues();
        if (items.length > 0) {
          const action = state.SAVE_BILLS({ payload: { data: { ...data, bill_item: items } } });
          this.store$.dispatch(action);
        }
      }
    } else {
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.bill = this.formService.getBill(data);
        this.form.patchValue(this.bill);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }

  ngOnDestroy() {
    this.store$.dispatch(globalState.CLEAR_INVENTORY_BY_CLIENT());
  }

  private loadInventoriesByClient(client) {
    const metadata = { resource: { id: client.id } };
    this.store$.dispatch(globalState.LOAD_INVENTORY_BY_CLIENT({ payload: { metadata } }));
  }

  private computeValues() {
    const computePerception$ = this.form
      .get('perception')
      .valueChanges.pipe(tap((compute) => this._computePerception$.next(compute)));
    const computeIVA$ = this.form.get('bill_type').valueChanges.pipe(
      map(({ label }) => label === 'Crédito fiscal'),
      tap((compute) => this._computeIVA$.next(compute))
    );

    this.subs.sink = merge(computeIVA$, computePerception$).subscribe();
  }
}
