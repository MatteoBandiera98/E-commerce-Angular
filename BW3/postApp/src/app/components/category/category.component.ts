import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product.interface';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = []
  category: string = ""
  categories: string[] = []
  isloaded = false;
  constructor(private router:Router, private route: ActivatedRoute, private prodSrv: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category']
      this.prodSrv.products.subscribe((value) => {
        this.isloaded = false
        this.categories = []
        this.products = value.filter((prod) => {
          if (!this.categories.includes(prod.category.toLowerCase())) {
            this.categories.push(prod.category.toLowerCase())
          }
          return prod.category.toLowerCase() === this.category.toLowerCase()
        })
        if (!this.categories.includes(this.category)) {
          this.router.navigate(['/'])
          return
        }
        this.isloaded = true
      })
    })
  }
}
