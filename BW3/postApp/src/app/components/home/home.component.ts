import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Product } from 'src/app/interface/product.interface';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentProductImageUrl: string = 'https://wallpapercave.com/wp/wp6967907.png'; // URL predefinito del prodotto
  currentProductIndex: number = 0; // Indice del prodotto corrente
  isLoaded = false;
  randomProducts: Product[] = []

  products:Product[] = [];

  constructor(private prodSrv: ProductsService) {}

  ngOnInit(): void {
    // this.prodSrv.initializeProductsFromJson()
    this.prodSrv.products.subscribe((value) => {
      this.products =value;
      // this.products.forEach((element) => {
      //   let img = new Image()
      //   img.src = element.imgUrl;
      //   img.onerror = function() {
      //     console.log('Immagine non caricata: '+element.title)
      //   }
      // })
      this.randomProducts = this.randomProductsF(21)
      this.isLoaded = true
    })
  }

  randomProductsF(num: number) {
    let prodottiUsciti: number[] = []
    let prodotti: Product[] = []
    for (let i = 0; i < num; i++) {
      let random = Math.floor(Math.random() * this.products.length)
      while (true) {
        if (!prodottiUsciti.includes(random)) {
          break
        }
        random = Math.floor(Math.random() * this.products.length)
      }
      prodottiUsciti.push(random)
      prodotti.push(this.products[random])
    }
    return prodotti
  }

  changeProduct(imageIndex: number) {
    // Cambia l'URL dell'immagine del prodotto in base all'indice passato
    if (imageIndex === 0) {
      this.currentProductImageUrl = 'https://wallpapercave.com/wp/wp6967907.png';
    } else if (imageIndex === 1) {
      this.currentProductImageUrl = 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846357018';
    } else if (imageIndex === 2) {
      this.currentProductImageUrl = 'https://rog.asus.com/media/1654038530859.jpg';
    }
    this.currentProductIndex = imageIndex; // Aggiorna l'indice del prodotto corrente
  }
}
