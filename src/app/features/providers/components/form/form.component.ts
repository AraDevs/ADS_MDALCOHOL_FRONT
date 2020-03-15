import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import * as state from '@features/providers/state';
import { Store } from '@ngrx/store';
import { MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT } from '@shared/constants';
import { SuccessService } from '@shared/services';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, SuccessService]
})
export class FormComponent implements OnInit {
  private subs = new SubSink();
  private update = false;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>,
    private successService: SuccessService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);

    // If the department change we filter the municipalities
    this.subs.sink = this.form
      .get('department')
      .valueChanges.pipe(filter(deparment => deparment))
      .subscribe(department => {
        const { id } = department;
        this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({ payload: { id } }));
      });

    this.successService.success(state.SAVE_PROVIDERS_SUCCESS, () => {
      this.form.reset();
      this.store$.dispatch(globalState.LOAD_PROVIDERS);
    });
  }

  save() {
    if (this.form.valid) {
      if (this.update) {
        this.message.success('Messages.Add.Success');
        return;
      }

      const values = this.form.value;
      const dataToSave = {
        seller_phone: values.seller_phone,
        partner: {
          name: values.name,
          address: values.address,
          munipality_id: values.municipality.id,
          nit: values.nit,
          phone: values.partner_phone,
          state: values.state ? 1 : 0
        }
      };
      const action = state.SAVE_PROVIDERS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
      return;
    }
    this.message.error('Messages.InvalidForm');
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      this.form.patchValue(data);
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }
}
