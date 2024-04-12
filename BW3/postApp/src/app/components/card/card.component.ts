import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interface/product.interface';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item!: Product;
  @Input() maxChar = 120
  constructor(private cartSrv: CartService, private authSrv: AuthService) {
    setTimeout(() => {
      console.log(this.item.id)
      this.item.favorite = this.authSrv.isFavorite(this.item.id)
      console.log(this.item.favorite)
    }, 1000)
  }
  addToCart() {
    if (this.item) {
      let cartItem = {...this.item, quantity: 1}
      this.cartSrv.addProductToCart(cartItem)
    }
  }

  toggleFavorite() {
    if (!this.item.favorite) {
      this.item.favorite = true
    } else {
      this.item.favorite = !this.item.favorite
    }

    if (this.item.favorite) {
      this.authSrv.addToFavorites(this.item)
    } else {
      this.authSrv.removeToFavorites(this.item.id)
    }
  }
}
