import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormModel } from '@features/sellers/config/form-model';
import * as state from '@features/sellers/state';
import { select, Store } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { Observable } from 'rxjs';
import { AppState } from '@state/app-state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel]
})
export class BaseComponent implements OnInit {
  form: FormGroup;
  fields: Partial<InputControlConfig>[];
  data: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'seller_code'],
    titles: {
      name: 'Nombre',
      seller_code: 'Codigo Vendedor'
    }
    // sortActiveColumn: 'name',
    // sortDirection: 'asc'
  };

  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(state.LOAD_SELLERS());
    this.data = this.store$.pipe(select(state.selectSellers));
  }

  saveSeller() {
    const values = this.form.value;

    const dataToSave = {
      name: values.name,
      seller_code: values.seller_code,
      state: values.state ? 1 : 0
    };
    const action = state.SAVE_SELLERS({ payload: { data: dataToSave } });
    this.store$.dispatch(action);
  }

  selectedRow(row: any) {
    this.form.patchValue({ name: row.name });
  }
}
