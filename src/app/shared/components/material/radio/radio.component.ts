import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RadioButtonConfig } from '@core/types';


@Component({
  selector: 'md-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: RadioButtonConfig;
  @Input() control: AbstractControl;


  constructor() { }

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
  }


}
