import { Component } from '@angular/core';

@Component({
  selector: 'md-total-titles-list',
  template: `
    <ul>
      <li *ngFor="let title of titles">
        {{ title | transloco }}
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `,
  ],
})
export class TotalTitlesListComponent {
  titles = [
    'Bill.FormTable.Footer.SubTotal',
    'Bill.FormTable.Footer.Perception',
    'Bill.FormTable.Footer.IVA',
    'Bill.FormTable.Footer.Total',
  ];
}
