import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-base',
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
