import { Component, OnInit } from '@angular/core';
import { FormModel } from './form-model';
import { FactoryFormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
  selector: 'md-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormModel, LoginService],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fields: Partial<InputControlConfig>[];
  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
  }

  login() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.loginService.login(username, password);
    }
  }
}
