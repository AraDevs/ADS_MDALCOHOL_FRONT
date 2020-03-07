import { Component, OnInit, Input } from '@angular/core';
import { ControlConfig } from '@core/types';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'md-control-generator',
  templateUrl: './control-generator.component.html',
  styleUrls: ['./control-generator.component.scss']
})
export class ControlGeneratorComponent implements OnInit {
  @Input() field: ControlConfig;
  @Input() form: FormGroup;
  @Input() formReference: FormGroupDirective;

  constructor() { }

  ngOnInit(): void {
  }

}
