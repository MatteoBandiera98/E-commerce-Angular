import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { CartProduct } from '../interface/cart-product.interface';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([])
  cartId: number = 0;
  cart$ = this.cart.asObservable();
  constructor(private authSrv: AuthService) {
    this.cart.subscribe((value) => {
      console.log(value)
      localStorage.setItem('cart', JSON.stringify(value))
    })
    this.authSrv.userData$.subscribe((value) => {
      if (value) {
        if (this.cartId !== 0) {
          // this.createCart()
        }
      } else {
        this.cartId = 0
      }
    })
  }

  addProductToCart(product: CartProduct) {
    console.log(this.cartId)
    if (this.cartId == 0) {
      let cart = this.cart.getValue()
      console.log(cart)
      let find = cart.findIndex((value) => value.title === product.title)
      console.log(find)
      if (find !== -1) {
        cart[find].quantity += product.quantity
        this.cart.next(cart)
      } else {
        let prodCart:CartProduct = {
          ...product,
          quantity: product.quantity
        }
        cart.push(prodCart)
        this.cart.next(cart)
      }
    }
  }

  removeProductToCart(product: Product) {
    if (this.cartId == 0) {
      let cart = this.cart.getValue()
      let find = cart.findIndex((value) => value.title === product.title)
      if (find !== -1) {
        cart[find].quantity -= 1
        if (cart[find].quantity <= 0) {
          cart.splice(find, 1)
        }
        this.cart.next(cart)
      }
    }
  }
}
