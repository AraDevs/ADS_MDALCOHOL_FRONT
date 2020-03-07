import { Component, OnInit, Input } from '@angular/core';
import { ControlConfig } from '@core/types';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'md-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {
  @Input() fields: ControlConfig[];
  @Input() form: FormGroup;
  @Input() formReference: FormGroupDirective;

  constructor() {}

  ngOnInit(): void {}
}
