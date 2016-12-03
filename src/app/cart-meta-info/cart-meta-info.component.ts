import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'yc-cart-meta-info',
  templateUrl: './cart-meta-info.component.html',
  styleUrls: ['./cart-meta-info.component.scss']
})
export class CartMetaInfoComponent implements OnInit, OnChanges {

  @Input() count: number;

  animationState: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    this.animationState = true;
    setTimeout(() => {
      this.animationState = false;
    }, 500);
  }

}
