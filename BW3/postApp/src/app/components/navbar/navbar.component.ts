import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/interface/cart-product.interface';
import { Product } from 'src/app/interface/product.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logged:boolean = false;
  user!: User| null;
  cart: CartProduct[] = [
    // {
    //   title: "WARNER GAMES - MORTAL KOMBAT 1 XBX",
    //   price: 59.9,
    //   recommendedPrice: 59.9,
    //   prevPrice: 59.9,
    //   details: "Piattaforma: XBOX SERIES X\nGenere: Picchiaduro\nPEGI: da 18 anni in su",
    //   description: "Scopri Mortal Kombat 1, il nuovo capitolo dell’iconico franchise. Scatena inconfondibili Brutality e affronta i kombattimenti con i personaggi più amati dai fan come mai prima d’ora!",
    //   imgUrl: "https://www.euronics.it/dw/image/v2/BFPN_PRD/on/demandware.static/-/Sites-catalog_euronics_master/default/dwd0e96aa2/hi-res/232005643.jpg?sw=1000&q=90&strip=false",
    //   category: "videogames",
    //   quantity: 10
    // }
  ]

  selectQuantity: Array<any> = [0]

  constructor(public authSrv: AuthService, private cartSrv: CartService) {}

  ngOnInit(): void {
    this.authSrv.userData$.subscribe((value) => {
      this.user = value
      if (value !== null) {
        this.logged = true
      } else {
        this.logged = false;
      }
    })
    this.cartSrv.cart$.subscribe((value) => {
      this.cart = value;
    })
  }

  enforceMinMax(i:number) {
    if (this.selectQuantity[i] != "") {
      // if (parseInt(this.selectQuantity[i]) < 0) {
      //   let input = document.getElementById('form'+i) as HTMLInputElement;
      //   if (input) {
      //     input.value = "1"
      //     this.cart[i].quantity = 1
      //     return
      //   }
      // }
      if (parseInt(this.selectQuantity[i]) < this.cart[i].quantity) {
        this.cartSrv.removeProductToCart(this.cart[i])
      } else if (parseInt(this.selectQuantity[i]) > this.cart[i].quantity) {
        this.cartSrv.addProductToCart(this.cart[i])
      }
    }
  }

  removeFromCart(product: Product) {
    this.cartSrv.removeProductToCart(product)
  }

  addToCart(product: Product) {
    let cart = {...product, quantity: 1}
    this.cartSrv.addProductToCart(cart)
  }
}
