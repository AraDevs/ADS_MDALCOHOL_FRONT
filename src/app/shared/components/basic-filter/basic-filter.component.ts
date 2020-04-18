import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, tap, filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'md-basic-filter',
  templateUrl: './basic-filter.component.html',
  styleUrls: ['./basic-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFilterComponent implements OnInit, OnDestroy {
  @Input() labelA = '';
  @Input() labelB = '';
  @Input() keyA = 'keyA';
  @Input() keyB = 'keyB';
  @Input() defaultValue = '';

  @Output() filterValue = new EventEmitter();

  private subs = new SubSink();

  a = new FormControl(false);
  b = new FormControl(false);

  constructor() {}

  ngOnInit(): void {
    const filter$ = merge(
      this.a.valueChanges.pipe(
        startWith(false),
        map((value) => ({ value, key: this.keyA }))
      ),
      this.b.valueChanges.pipe(
        startWith(false),
        map((value) => ({ value, key: this.keyB }))
      )
    ).pipe(
      tap(({ value, key }) => {
        if (value && key === 'active') {
          this.b.setValue(false, { emitEvent: false });
        } else if (value && key === 'deleted') {
          this.a.setValue(false, { emitEvent: false });
        } else {
          this.a.setValue(false, { emitEvent: false });
          this.b.setValue(false, { emitEvent: false });
        }
      }),
      map(({ value, key }) => (value ? key : this.defaultValue))
    );
    this.subs.sink = filter$.subscribe((val) => this.filterValue.next(val));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
