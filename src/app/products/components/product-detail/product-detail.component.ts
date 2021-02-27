import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@core/models/product.model';
import { switchMap, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsService } from '@core/services/products/products.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(private route: ActivatedRoute, private ProductService: ProductsService) {
  }

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.ProductService.getProduct(params.id);
        })
      );
  }

  // fetchProduct(id: string): void{
  // this.ProductService.getProduct(id).subscribe(product => {
  //   this.product = product;
  // });
  // }

  createProduct(): void {
    const newProduct: Product = {
      id: '222',
      title: 'Nuevo desde angular',
      image: 'assets\images\banner-1.jpg',
      price: 3000,
      description: 'Nuevo producto'
    };
    this.ProductService.createProduct(newProduct).subscribe(product => {
      console.log(product);
    });
  }
  updateProduct(): void {
    const updateProduct: Partial<Product> = {
      price: 55000,
      description: 'Nuevo producto'
    };
    this.ProductService.updateProduct('2', updateProduct).subscribe(product => {
      console.log(product);
    });
  }

  deleteProduct(): void {
    this.ProductService.deleteProduct('3').subscribe(rta => {
      console.log(rta);
    });
  }

  getFile() {
    this.ProductService.getFile()
      .subscribe((file) => {
        FileSaver.saveAs(file, 'file.pdf');
      });
  }

  getRandomUser() {
    this.ProductService.getRandomUsers()
      .subscribe(
        users => { //cuando todo sale bien
          console.log(users);
        },
        error => {
          console.error(error)
        }
      );
  }
}
