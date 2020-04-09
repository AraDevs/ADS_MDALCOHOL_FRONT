import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ControlDataTableConfig } from '@shared/types';
import { BehaviorSubject } from 'rxjs';
import { BillTableConfiguration } from './bill-table-configuration';

@Component({
  selector: 'md-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.scss'],
  providers: [BillTableConfiguration],
})
export class BillTableComponent implements OnInit {
  source$ = new BehaviorSubject([]);
  options = [1, 2, 3];
  config = this.tableConfig.getConfiguration();
  constructor(private fb: FormBuilder, private tableConfig: BillTableConfiguration) {}

  ngOnInit(): void {}

  add() {
    const product = new FormControl();
    const quantity = new FormControl();
    const price = new FormControl();

    const row = { product, quantity, price, total: 0 };
    const rows = this.source$.value;
    this.source$.next([...rows, row]);
  }
}
