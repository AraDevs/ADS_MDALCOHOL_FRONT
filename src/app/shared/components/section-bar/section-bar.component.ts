import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'md-section-bar',
  templateUrl: './section-bar.component.html',
  styleUrls: ['./section-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionBarComponent implements OnInit {
  @Input() btnText = 'Buttons.New';
  @Input() title: string;

  @Output() buttonEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
