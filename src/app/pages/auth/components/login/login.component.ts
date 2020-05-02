import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormModel } from './form-model';
import { FactoryFormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'md-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  fields: Partial<InputControlConfig>[];

  constructor(
    private formModel: FormModel,
    private factoryForm: FactoryFormService,
    private loginService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
  }

  login() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.loginService
        .login(username, password)
        .pipe(take(1))
        .subscribe((data) => {
          if (data.success) {
            this.router.navigateByUrl('/dashboard');
          }
        });
    }
  }
}
