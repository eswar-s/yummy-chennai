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
    ]),
    trigger('ycSlideBottomCart', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('in => void', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.4s', style({ transform: 'translateY(100%)', opacity: 0 }))
      ]),
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.4s', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'yc works!';

  products: Product[];
  cartItems: Product[];
  searchTerm: string;
  selectedProduct: Product;
  orderedItems: Product[];

  isCart: boolean = false;

  constructor() {
    this.products = [];
    this.cartItems = [];
    this.orderedItems = [];
    let storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts && storedProducts.length > 0) {
      storedProducts.forEach((product, index) => {
        if (product.quantity === 0 && product.inCart) {
          product.inCart = false;
        }
        this.products.push(Object.assign({}, product));
      });
      this.cartItems = this.products.filter(item => {
        return item.inCart;
      });
    }
  }

  ngOnInit() {
    this.searchTerm = '';
    if (this.products.length === 0) {
      products_store.forEach((product, index) => {
        this.products.push(Object.assign({}, product, {
          id: index,
          inCart: false,
          quantity: 0
        }));
      });
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  addToCart(product: Product) {
    product.inCart = true;
    product.quantity = 1;
    this.cartItems.push(product);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => {
      if (item.id === product.id) {
        product.inCart = false;
      }
      return item.id !== product.id;
    });
    localStorage.setItem('products', JSON.stringify(this.products));
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

  openCart() {
    this.isCart = true;
  }

  closeCart() {
    this.orderedItems = [];
    this.isCart = false;
    this.products.forEach(item => {
      if (item.quantity === 0 && item.inCart) {
        item.inCart = false;
      }
    });
    this.cartItems = this.products.filter(item => {
      return item.inCart;
    });
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => {
      totalPrice += (item.quantity * this.computeDiscountPrice(item.price, item.offer));
    });
    return totalPrice;
  }

  increaseQuantity(product: Product) {
    product.quantity = product.quantity + 1;
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 0) {
      product.quantity = product.quantity - 1;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }

  placeOrder() {
    this.cartItems.forEach(item => {
      item.quantity = 0;
      item.inCart = false;
    });
    this.orderedItems = this.cartItems.slice(0);
    this.cartItems = [];
    localStorage.setItem('products', JSON.stringify(this.products));
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
  quantity?: number;
}
