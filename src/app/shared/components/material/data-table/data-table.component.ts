import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataTableConfig } from '@shared/types';

@Component({
  selector: 'md-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() config: DataTableConfig = {
    displayedColumns: [],
    titles: {}
  };
  @Input() dataSource$: Observable<any[]> = of([]);
  @Input() loading$: Observable<boolean>;
  @Output() selectedRow = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
