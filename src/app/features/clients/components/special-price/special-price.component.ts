import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { FactoryFormService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { SpecialPriceFormModel } from '@features/clients/config/special-price-form-model';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import * as clientState from '@features/clients/state';
import { MessageService } from '@core/services/message.service';
import { SpecialPriceFormService } from './special-price-form.service';

@Component({
  selector: 'md-special-price',
  templateUrl: './special-price.component.html',
  styleUrls: ['./special-price.component.scss'],
  providers: [SpecialPriceFormModel, SpecialPriceFormService]
})
export class SpecialPriceComponent implements OnInit {
  private client: any;
  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  constructor(
    private store$: Store<AppState>,
    private formModel: SpecialPriceFormModel,
    private factoryForm: FactoryFormService,
    private message: MessageService,
    private formService: SpecialPriceFormService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
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

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.client = data;
      const control = this.form.get('client');
      control.setValue(this.client.partnerName);
      control.disable();
    }
  }
}
