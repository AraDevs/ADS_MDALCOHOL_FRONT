import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel]
})
export class BaseComponent implements OnInit {
  providers$: Observable<any[]>;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.providers$ = this.store$.pipe(select(state.selectProviders));
    // this.store$.dispatch(state.LoadProviders());

    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
  }
}
