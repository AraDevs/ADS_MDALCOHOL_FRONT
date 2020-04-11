import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'md-table-input',
  template: `
    <div [formGroup]="form">
      <mat-form-field class="bill-control" appearance="outline">
        <input
          matInput
          [formControlName]="controlName"
          autocomplete="off"
          (keyup)="keyUp.emit($event)"
        />
      </mat-form-field>
    </div>
  `,
  styles: [],
  providers: [ErrorStateMatcher],
})
export class TableInputComponent {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Output() keyUp = new EventEmitter();
}
