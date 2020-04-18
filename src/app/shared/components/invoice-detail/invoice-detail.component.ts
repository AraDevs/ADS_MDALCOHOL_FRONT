import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-invoice-detail',
  template: `
    <mat-list *ngIf="details$ | async as details" class="mb-4">
      <ng-container *ngFor="let detail of details">
        <mat-list-item>
          <div class="d-flex justify-content-between w-100">
            <span class="title">{{ detail.title | transloco }}</span>
            {{ detail.value }}
          </div>
        </mat-list-item>
        <mat-divider></mat-divider>
      </ng-container>
    </mat-list>
  `,
  styles: [
    `
      .title {
        color: #3f51b5;
      }

      .total {
        font-size: 24px;
        color: #3f51b5;
      }
    `,
  ],
})
export class InvoiceDetailComponent {
  @Input() details$: Observable<any[]>;
}
