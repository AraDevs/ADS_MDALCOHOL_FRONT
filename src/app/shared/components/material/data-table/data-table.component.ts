import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataTableConfig } from '@shared/types';
import { ObjectPathService } from '@core/services/object-path.service';

@Component({
  selector: 'md-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  @Input() config: DataTableConfig = {
    displayedColumns: [],
    titles: {},
  };
  @Input() dataSource$: Observable<any[]> = of([]);
  @Input() loading$: Observable<boolean>;
  @Output() add = new EventEmitter<any>();

  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() detail = new EventEmitter<any>();

  @Output() selectedRow = new EventEmitter<any>();

  @Input() displayUpdateIcon = true;
  @Input() displayMoneyIcon = false;
  @Input() displayDeleteIcon = false;
  @Input() displayDetailIcon = false;

  constructor(private objPath: ObjectPathService) {}

  ngOnInit(): void {}

  getCellValue(row: string, key: string) {
    return this.objPath.get(row, key);
  }

  getDelete() {
    return this.delete;
  }
}
