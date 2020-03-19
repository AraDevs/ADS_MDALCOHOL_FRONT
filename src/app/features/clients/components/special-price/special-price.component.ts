import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { FactoryFormService } from '@core/services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialPriceFormModel } from '@features/clients/config/special-price-form-model';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import * as clientState from '@features/clients/state';
import { MessageService } from '@core/services/message.service';
import { SpecialPriceFormService } from './special-price-form.service';
import { SuccessService, ErrorService } from '@shared/services';
import { Observable } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { strictEqual } from 'assert';

@Component({
  selector: 'md-special-price',
  templateUrl: './special-price.component.html',
  styleUrls: ['./special-price.component.scss'],
  providers: [SpecialPriceFormModel, SpecialPriceFormService, SuccessService, ErrorService]
})
export class SpecialPriceComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;

  private client: any;
  private specialPrice = null;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  specialPrices$: Observable<any>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['inventory', 'price', 'state', 'actions'],
    titles: {
      inventory: 'Clients.SpecialTable.Inventory',
      price: 'Clients.SpecialTable.Price',
      state: 'Clients.SpecialTable.State',
      actions: 'Table.Actions'
    },
    keys: ['inventory.name', 'price', 'state', 'actions']
  };

  constructor(
    private store$: Store<AppState>,
    private formModel: SpecialPriceFormModel,
    private factoryForm: FactoryFormService,
    private message: MessageService,
    private formService: SpecialPriceFormService,
    private successService: SuccessService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);

    this.specialPrices$ = this.store$.pipe(select(clientState.selectSpecialPrices));

    this.successService.success(clientState.SAVE_SPECIAL_PRICE_SUCCESS, () => {
      this.loadSpecialPrices();
      this.showSuccessMessage();

      this.specialPrice = null;

      this.formDirective.resetForm();
      this.form.patchValue({ state: true });
    });

    // this.errorService.error(this.client.SAVE_PROVIDERS_FAIL, (payload: any) => {
    //   const { customErrorsServer } = payload;
    //   this.errors.next(customErrorsServer);
    // });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getSpecialPriceDTO({ ...values, id: this.client.id });
      this.store$.dispatch(clientState.SAVE_SPECIAL_PRICE({ payload: { data } }));
    } else {
      this.message.error('Messages.InvalidForm');
    }
  }

  update(specialPrice: any) {
    this.specialPrice = specialPrice;
    this.form.patchValue(this.formService.getSpecialPrice(specialPrice));
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.client = data;
      const control = this.form.get('client');
      control.setValue(this.client.business_name);
      control.disable();
      this.loadSpecialPrices();
    }
  }

  private loadSpecialPrices() {
    const metadata = { resource: { id: this.client.id } };
    this.store$.dispatch(clientState.LOAD_SPECIAL_PRICE({ payload: { metadata } }));
  }

  private showSuccessMessage() {
    const type = this.specialPrice === null ? 'Add' : 'Update';
    this.message.success(`Messages.${type}.Success`);
  }
}
