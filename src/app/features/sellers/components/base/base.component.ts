import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import {FormModel} from '@features/sellers/config/form-model';
import { InputControlConfig } from '@core/types';
import { FormService } from '@core/services';
import { Store, select } from '@ngrx/store';
import * as state from '@features/sellers/state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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

  constructor(private formModel:FormModel, private formService:FormService, private store$:Store<any>) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(state.LoadSellers());
    this.data = this.store$.pipe(select(state.selectSellers));
  }

}
