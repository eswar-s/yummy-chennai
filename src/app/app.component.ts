import { Component, OnInit,
  trigger, state, transition, style, animate
} from '@angular/core';

import { products_store } from './products_store';

@Component({
  selector: 'yc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('ycSlideTop', [
      state('in', style({ transform: 'translate3d(0, 0, 0)' })),
      transition('void => *', [
        style({ visibility: 'visible', transform: 'translateY(-100%)' }),
        animate('0.3s', style({ transform: 'translateY(0)' }))
      ]),
      transition('in => void', [
        style({ visibility: 'visible', transform: 'translateY(0%)' }),
        animate('0.3s', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
    trigger('ycSlideBottom', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('in => void', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.2s', style({ transform: 'translateY(100%)', opacity: 0 }))
      ]),
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.2s 150ms', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('ycZoom', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('in => void', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('0.2s', style({ transform: 'scale(0)', opacity: 0 }))
      ]),
      transition('void => *', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('0.2s 150ms', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'yc works!';

  products: Product[];
  cartItems: any[];
  searchTerm: string;
  selectedProduct: Product;

  ngOnInit() {
    this.searchTerm = '';
    this.products = [];
    products_store.forEach((product, index) => {
      this.products.push(Object.assign({}, product, {
        id: index,
        inCart: false
      }));
    });
    this.cartItems = [];
  }

  addToCart(product: Product) {
    product.inCart = true;
    this.cartItems.push(product);
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => {
      if (item.id === product.id) {
        product.inCart = false;
      }
      return item.id !== product.id;
    });
  }

  showProductInfo(product: Product) {
    this.selectedProduct = product;
  }

  closeProductInfo() {
    this.selectedProduct = null;
  }

  computeDiscountPrice(price: number, offer: number) {
    return price - Math.floor((price / 100) * offer);
  }
}

export interface Product {
  name: string;
  price: number;
  offer: number;
  image: string;
  description?: string;
  ingredients?: string;
  link: string;
  id?: number;
  inCart?: boolean;
}
