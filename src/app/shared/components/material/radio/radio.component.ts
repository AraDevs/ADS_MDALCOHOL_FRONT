import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RadioButtonConfig } from '@core/types';
import { isObservable } from 'rxjs';

@Component({
  selector: 'md-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: RadioButtonConfig;
  @Input() control: AbstractControl;

  constructor(private asyncPipe: AsyncPipe) {}

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
  }

  getLabelValue(): string {
    const { label } = this.field;
    if (isObservable(label)) {
      return this.asyncPipe.transform(label) as string;
    }
    return label;
  }
}
