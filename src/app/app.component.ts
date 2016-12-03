import { Component, OnInit } from '@angular/core';

import { products } from './products';

@Component({
  selector: 'yc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yc works!';

  products: Product[];
  cartItems: any[];
  searchTerm: string;

  ngOnInit() {
    this.searchTerm = '';
    this.products = [];
    products.forEach((product, index) => {
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
}

export interface Product {
  name: string;
  price: number;
  image: string;
  id?: number;
  inCart?: boolean;
}
