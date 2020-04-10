import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'md-table-select',
  template: `
    <div [formGroup]="form">
      <mat-form-field class="bill-select-control" appearance="outline">
        <mat-select
          [formControlName]="controlName"
          (valueChange)="valueChange.emit($event)"
          [compareWith]="compareFn"
        >
          <mat-option *ngFor="let product of products$ | async" [value]="product"
            >{{ product.label }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class TableSelectComponent {
  @Input() products$: Observable<any[]>;
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Output() valueChange = new EventEmitter();

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
