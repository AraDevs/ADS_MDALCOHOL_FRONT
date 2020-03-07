import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective, AbstractControl } from '@angular/forms';
import { ControlValidationService } from '@core/services';
import { SelectControlConfig } from '@core/types';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'md-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() field: SelectControlConfig;
  @Input() formReference: FormGroupDirective;
  @Input() cssClasses = '';
  @Input() options$: Observable<{ label: string;[key: string]: string; }[]>;

  control: AbstractControl;

  private subs = new SubSink();
  private error = new Subject<string>();
  error$ = this.error.asObservable();
  setDefaultOption$ = new BehaviorSubject('');

  constructor(private validator: ControlValidationService) { }

  ngOnInit() {
    this.control = this.form.get(this.field.key);
    this.subs.sink = this.formReference.ngSubmit.subscribe(() => {
      const result = this.validator.valid(this.control, this.field);
      this.error.next(result);
    });

    this.subs.sink = this.control.valueChanges
      .pipe(filter(val => val === null || val === ''))
      .subscribe(val => {
        this.setDefaultOption$.next(val);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.label === c2.label : c1 === c2;
  }
}
