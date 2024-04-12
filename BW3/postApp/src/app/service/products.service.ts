import { Injectable } from '@angular/core'; 
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../interface/product.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products!: Observable<Product[]>;
  constructor(private af: AngularFireDatabase, private afs: AngularFirestore) {
    this.products = this.af.list<Product>('products').valueChanges();
  }

  initializeProductsFromJson() {
    fetch('assets/db.json')
      .then((response) => response.json())
      .then(async (data: Product[]) => {
        data.forEach(async (product, index) => {
          const ref: AngularFireObject<Product> = this.af.object(`products/${index}`)
          await ref.update(product);
        })
      });
  }
}
