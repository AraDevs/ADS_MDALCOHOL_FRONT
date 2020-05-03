import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlConfig } from '@core/types';
import { isObservable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'md-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: ControlConfig;
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
