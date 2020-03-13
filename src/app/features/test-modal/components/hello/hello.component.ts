import { DYNAMIC_MODAL_DATA } from '@shared/constants';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'md-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  hello: string;
  constructor(@Inject(DYNAMIC_MODAL_DATA) private data: any) {}

  ngOnInit(): void {
    this.hello = this.data.hello;
  }
}
