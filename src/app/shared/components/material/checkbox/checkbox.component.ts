import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputFieldConfig } from '@core/types';
import { Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'md-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() field: InputFieldConfig;
  @Input() control: AbstractControl;

  private subs = new SubSink();


  constructor() { }

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
