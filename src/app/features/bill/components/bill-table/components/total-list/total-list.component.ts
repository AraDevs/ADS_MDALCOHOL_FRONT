import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-total-list',
  template: `
    <ul *ngIf="totals$ | async as totals">
      <li class="footer-text">$ {{ totals.subTotal }}</li>
      <li class="footer-text">$ {{ totals.perception }}</li>
      <li class="footer-text">$ {{ totals.iva }}</li>
      <li class="footer-text">$ {{ totals.total }}</li>
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
