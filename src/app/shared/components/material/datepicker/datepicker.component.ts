import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ControlValidationService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { Subject, isObservable } from 'rxjs';
import { SubSink } from 'subsink';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'md-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() field: InputControlConfig;
  @Input() formReference: FormGroupDirective;
  @Input() control: AbstractControl;

  private subs = new SubSink();
  private error = new Subject<string>();
  error$ = this.error.asObservable();

  constructor(private validator: ControlValidationService, private asyncPipe: AsyncPipe) {}

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
    this.subs.sink = this.formReference.ngSubmit.subscribe(() => {
      const result = this.validator.valid(this.control, this.field);
      this.error.next(result);
    });

    // Global validator are aplied after all the validator in the control
    if (this.field.globalValidatorMessage) {
      this.subs.sink = this.field.globalValidatorMessage.subscribe((message) => {
        if (this.control.valid) {
          this.error.next(message);
        }
      });
    }
  }

  getLabelValue(): string {
    const { label } = this.field;
    if (isObservable(label)) {
      return this.asyncPipe.transform(label) as string;
    }
    return label;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
