import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '@core/types';

@Component({
  selector: 'md-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: FieldConfig;
  @Input() control: AbstractControl;



  constructor() { }

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
  }


}
