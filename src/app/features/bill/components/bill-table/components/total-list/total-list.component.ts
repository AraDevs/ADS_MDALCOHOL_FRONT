import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-total-list',
  template: `
    <ul *ngIf="totals$ | async as totals">
      <li class="footer-text">$ {{ totals.subTotal.toFixed(2) }}</li>
      <li class="footer-text">$ {{ totals.perception.toFixed(2) }}</li>
      <li class="footer-text">$ {{ totals.iva.toFixed(2) }}</li>
      <li class="footer-text">$ {{ totals.total.toFixed(2) }}</li>
    </ul>
  `,
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .footer-text {
        color: #3f51b5;
      }
    `,
  ],
})
export class TotalListComponent {
  @Input() totals$: Observable<{
    subTotal: number;
    perception: number;
    iva: number;
    total: number;
  }>;
}
