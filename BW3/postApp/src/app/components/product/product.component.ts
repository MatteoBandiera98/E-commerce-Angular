import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartProduct } from 'src/app/interface/cart-product.interface';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: CartProduct
  quantity: string = "1";
  prodId = 0
  category = ""
  constructor(private route: ActivatedRoute, private prodSrv: ProductsService, private cartSrv: CartService, private router: Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.prodId = parseInt(params['prodotto'])
      this.category = params['category']
      this.prodSrv.products.subscribe((value) => {
        value.forEach((prod) => {
          if (prod.id == this.prodId) {
            prod.details = prod.details.replaceAll('\n', '<br>')
            prod.details = prod.details.replaceAll(',', '<br>')
            this.product = {...prod, quantity: 1}
          }
        })
      })
    })
  }

  addQuantity() {
    this.quantity = (parseInt(this.quantity) + 1).toString()
  }

  removeQuantity() {
    if (parseInt(this.quantity) - 1 < 1) {
      return
    }
    this.quantity = (parseInt(this.quantity) - 1).toString()
  }

  enforceMinMax(i:number) {
    if (this.quantity != "") {
      if (parseInt(this.quantity) < 1) {
        this.quantity = "1"
      }
    }
  }

  // removeFromCart(product: Product) {
  //   this.cartSrv.removeProductToCart(product)
  // }

  addToCart() {
    this.product.quantity = parseInt(this.quantity)
    this.cartSrv.addProductToCart(this.product)
    this.router.navigate(['/'])
  }
}
