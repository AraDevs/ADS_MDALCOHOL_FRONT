import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, AbstractControl } from '@angular/forms';
import { InputFieldConfig } from '@core/types';
import { SubSink } from 'subsink';
import { Subject } from 'rxjs';
import { ControlValidationService } from '@core/services';

@Component({
  selector: 'md-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() field: InputFieldConfig;
  @Input() formReference: FormGroupDirective;
  @Input() control: AbstractControl;

  private subs = new SubSink();
  private error = new Subject<string>();
  $error = this.error.asObservable();

  constructor(private validator: ControlValidationService) { }

  ngOnInit(): void {
    this.control = this.form.get(this.field.key);
    this.subs.sink = this.formReference.ngSubmit.subscribe(() => {
      const result = this.validator.valid(this.control, this.field);
      this.error.next(result);
    });

    // Global validator are aplied after all the validator in the control
    if (this.field.globalValidatorMessage) {
      this.subs.sink = this.field.globalValidatorMessage.subscribe(message => {
        if (this.control.valid) {
          this.error.next(message);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
