import { Component, OnInit } from '@angular/core';
import { FormModel } from './form-model';
import { FactoryFormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'md-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormModel],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fields: Partial<InputControlConfig>[];
  constructor(private formModel: FormModel, private factoryForm: FactoryFormService) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
  }

  login() {}
}
