import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ControlDataTableConfig } from '@shared/types';
import { BehaviorSubject, of, merge, Subject } from 'rxjs';
import { BillTableConfiguration } from './bill-table-configuration';
import { map, pairwise, startWith, filter, switchMap } from 'rxjs/operators';

type Key = number;
type Row = number;

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [BillTableConfiguration],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillTableComponent implements OnInit {
  selectedProducts = new Map<Key, Row>();
  selectedRows = new Map<Row, Key>();

  source$ = new BehaviorSubject([]);
  options = [
    { id: 1, value: 20, label: 'P1' },
    { id: 2, value: 10, label: 'P3' },
    { id: 3, value: 30, label: 'P2' },
  ];
  config = this.tableConfig.getConfiguration();
  constructor(private fb: FormBuilder, private tableConfig: BillTableConfiguration) {}

  ngOnInit(): void {}

  add() {
    const product = new FormControl();
    const quantity = new FormControl(0);
    const price = new FormControl(0);

    const newRow = { product, quantity, price, total: 0 };
    const rows = this.source$.value;
    this.source$.next([...rows, newRow]);
  }

  cleanRecord(row: number) {
    this.clearCache(row);

    const records = this.source$.value.slice();
    const product = records[row].product as FormControl;
    const price = records[row].price as FormControl;

    product.setValue(null, { emitEvent: false });
    price.setValue(0);

    return records;
  }

  updateRecord(inventory: any, row: number) {
    const { id } = inventory;

    const rowHasProduct = this.selectedRows.has(row);
    if (rowHasProduct) {
      this.clearCache(row);
    }

    this.selectedProducts.set(id, row);
    this.selectedRows.set(row, id);

    const records = this.source$.value.slice();
    const control = records[row].price as FormControl;
    control.setValue(inventory.value);
    return records;
  }

  getInventory(inventory: any, row: number) {
    const { id } = inventory;
    const rowHasProduct = this.selectedProducts.get(id) !== undefined;

    if (!rowHasProduct) {
      const records = this.updateRecord(inventory, row);
      this.source$.next(records);
    } else {
      const records = this.cleanRecord(row);
      this.source$.next(records);
    }
  }

  private clearCache(row: number) {
    const product = this.selectedRows.get(row);
    const rowToDelete = this.selectedProducts.get(product);

    this.selectedProducts.delete(product);
    this.selectedRows.delete(rowToDelete);
  }
}
