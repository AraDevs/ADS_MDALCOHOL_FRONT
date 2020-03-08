import { Component, OnInit } from '@angular/core';
import { FormModel } from '@features/clients/config/form-model';
import { InputControlConfig } from '@core/types';
import { FormService } from '@core/services';
import { FormGroup } from '@angular/forms';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Store, select } from '@ngrx/store';
import * as state from '@features/clients/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel]
})
export class BaseComponent implements OnInit {

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  data: Observable<any[]>;

  constructor(private formModel: FormModel, private formService: FormService, private store$: Store<any>) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(state.LOAD_SELLERS());
    this.data = this.store$.pipe(select(state.selectSellers));
  }

}
