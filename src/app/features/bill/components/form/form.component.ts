import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { FormModel } from '@features/bill/config/form-model';
import { FormGroup } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FactoryFormService } from '@core/services';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { SuccessService, ErrorService } from '@shared/services';
import { FormService } from '@features/bill/components/form/form.service';
import { Subject, Observable } from 'rxjs';
import { MessageService } from '@core/services/message.service';
import { DYNAMIC_MODAL_DATA, MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT } from '@shared/constants';
import * as state from '@features/bill/state';
import * as globalState from '@state/index';
import { SubSink } from 'subsink';
import { map, startWith, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, FormService, SuccessService, ErrorService],
})
export class FormComponent implements OnInit {
  private subs = new SubSink();
  private errors = new Subject<string[]>();
  private update = false;
  private bill: any;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();
  products$: Observable<any[]>;

  computePerception$: Observable<boolean>;
  computeIVA$: Observable<boolean>;

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private errorService: ErrorService,
    private formService: FormService,
    private message: MessageService,
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

    this.subs.sink = this.form.get('clientId').valueChanges.subscribe((client) => {
      this.loadInventoriesByClient(client);
    });

    this.computePerception$ = this.form
      .get('perception')
      .valueChanges.pipe(startWith(false), shareReplay(1));
    this.computeIVA$ = this.form.get('bill_type').valueChanges.pipe(
      startWith(false),
      map(({ label }) => label === 'Crédito Fiscal'),
      shareReplay(1)
    );

    this.successService.success(state.SAVE_BILLS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_BILLS());
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
        console.log(data.client_id);
        // const action = state.SAVE_BILLS({ payload: { data } });
        // this.store$.dispatch(action);
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

  private loadInventoriesByClient(client) {
    const metadata = { resource: { id: client.id } };
    this.store$.dispatch(globalState.LOAD_INVENTORY_BY_CLIENT({ payload: { metadata } }));
  }
}
