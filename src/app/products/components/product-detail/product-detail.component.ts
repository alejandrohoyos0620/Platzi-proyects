import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Product} from '../../../core/models/product.model';

import {ProductsService} from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor( private route: ActivatedRoute, private ProductService: ProductsService) { 
   
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
    const id = params.id;
    this.fetchProduct(id);
    });
  }

  fetchProduct(id: string){
    this.ProductService.getProduct(id).subscribe(product => {
      this.product=product;
    });
  }
  createProduct(){
    const newProduct: Product ={
      id: '222',
      title: 'Nuevo desde angular',
      image: 'assets\images\banner-1.jpg',
      price: 3000,
      description: 'Nuevo producto'
    }
    this.ProductService.createProduct(newProduct).subscribe(product => {
      console.log(product);
    })
  }
  updateProduct(){
    const updateProduct: Partial<Product> ={
      price: 55000,
      description: 'Nuevo producto'
    }
    this.ProductService.updateProduct('2', updateProduct).subscribe(product => {
      console.log(product);
  })
  }

  deleteProduct(){
    this.ProductService.deleteProduct('3').subscribe(rta => {
      console.log(rta);
    });
  }

}
