import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-total-list',
  template: `
    <ul *ngFor="let total of totals$ | async">
      <li class="footer-text">$ {{ total.toFixed(2) }}</li>
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
  @Input() totals$: Observable<number[]>;
}
