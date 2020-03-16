import { Component, OnInit } from '@angular/core';
import { ModalFactoryService } from '@shared/services';
import { HelloComponent } from '../hello/hello.component';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  constructor(private modalFactory: ModalFactoryService) {}

  ngOnInit(): void {}

  open() {
    // this.modalFactory.create(HelloComponent);
  }
}
