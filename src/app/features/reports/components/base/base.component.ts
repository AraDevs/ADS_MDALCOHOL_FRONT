import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormModel } from '@features/reports/config/form-model';
import { FactoryFormService } from '@core/services';
import { SelectControlConfig } from '@core/types';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit {
  form: FormGroup;
  fields: SelectControlConfig[];

  constructor(private formModel: FormModel, private factoryForm: FactoryFormService) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.factoryForm.createPlainForm(this.fields as any);
  }

  generateReport() {}
}
