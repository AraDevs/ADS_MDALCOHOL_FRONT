import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import {FormModel} from '@features/sellers/config/form-model';
import { InputControlConfig } from '@core/types';
import { FormService } from '@core/services';
import { Store, select } from '@ngrx/store';
import * as state from '@features/sellers/state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataTableConfig } from '@shared/types';


@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel]
})
export class BaseComponent implements OnInit {

  form:FormGroup;
  fields:Partial<InputControlConfig>[];
  data:Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'seller_code'],
    titles: {
      name: 'Nombre',
      seller_code: 'Codigo Vendedor'
    }
    // sortActiveColumn: 'name',
    // sortDirection: 'asc'
  };

  constructor(private formModel:FormModel, private formService:FormService, private store$:Store<any>) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(state.LoadSellers());
    this.data = this.store$.pipe(select(state.selectSellers));
  }

  saveSeller(){
    const values = this.form.value;
    
    const dataToSave =  {name: values['name'], seller_code: values['seller_code'], state: values['state'] ? 1 : 0 };
    const action = state.SaveSellers({payload: {data: dataToSave}})
    this.store$.dispatch(action);
  }

  selectedRow(row:any){
    this.form.patchValue({name: row.name})
  }

}
