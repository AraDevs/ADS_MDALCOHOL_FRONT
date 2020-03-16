import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormModel } from '@features/sellers/config/form-model';
import * as globalState from '@state/index';
import * as state from '@features/sellers/state';
import { select, Store } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { Observable } from 'rxjs';
import { AppState } from '@state/app-state';
import { SuccessService } from '@shared/services';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel, SuccessService]
})
export class BaseComponent implements OnInit {
  form: FormGroup;
  fields: Partial<InputControlConfig>[];
  data: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'seller_code', 'state', 'actions'],
    titles: {
      name: 'Sellers.Table.Name',
      seller_code: 'Sellers.Table.SellerCode',
      state: 'Sellers.Table.State',
      actions: 'Sellers.Table.Actions'
    },
    keys: ['name', 'seller_code', 'state', 'actions']
  };

  constructor(
    private formModel: FormModel,
    private FactoryFormService: FactoryFormService,
    private store$: Store<AppState>,
    private successService: SuccessService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.FactoryFormService.createPlainForm(this.fields as any);
    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.data = this.store$.pipe(select(globalState.selectSellers));

    this.successService.success(state.SAVE_SELLERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_SELLERS());
    });
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;

      const dataToSave = {
        name: values.name,
        seller_code: values.seller_code,
        state: values.state ? 1 : 0
      };
      const action = state.SAVE_SELLERS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
      return;
    }

    //alert('Llene los campos:*');
  }

  selectedRow(row: any) {
    this.form.patchValue({ name: row.name });
  }
}
