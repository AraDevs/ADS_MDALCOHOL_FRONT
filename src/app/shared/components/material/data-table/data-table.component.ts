import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ObjectPathService } from '@core/services/object-path.service';
import { DataTableConfig } from '@shared/types';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'md-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input() config: DataTableConfig = {
    displayedColumns: [],
    titles: {},
  };
  @Input() dataSource$: Observable<any[]> = of([]);
  @Input() loading$: Observable<boolean>;

  @Input() displayUpdateIcon = true;
  @Input() displayMoneyIcon = false;
  @Input() displayDeleteIcon = false;
  @Input() displayDetailIcon = false;

  @Input() hideDeleteIconByCondition = false;
  @Input() hideDeleteIconCondition: (row: any) => boolean = null;

  @Output() add = new EventEmitter<any>();

  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() detail = new EventEmitter<any>();

  @Output() selectedRow = new EventEmitter<any>();

  constructor(private objPath: ObjectPathService) {}

  getCellValue(row: string, key: string) {
    return this.objPath.get(row, key);
  }

  getDelete() {
    return this.delete;
  }

  hideIconByCondition(row: any) {
    if (this.hideDeleteIconByCondition && this.hideDeleteIconCondition !== null) {
      return !this.hideDeleteIconCondition(row);
    }
    return true;
  }
}
