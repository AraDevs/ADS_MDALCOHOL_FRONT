import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'md-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() displayedColumns: string[] = [];
  @Input() titles: { [column: string]: string; } = {};
  @Input() dataSource$: Observable<any[]> = of([]);

  constructor() { }



  ngOnInit(): void {
  }

}
