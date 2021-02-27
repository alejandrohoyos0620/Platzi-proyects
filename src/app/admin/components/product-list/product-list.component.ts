import { Component, OnInit } from '@angular/core';

import { ProductsService } from '@core/services/products/products.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productsService.getAllProducts().subscribe(products =>
      this.products = products
    );
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe(rta => {
      if (rta) {
        const index = this.products.findIndex((product) => product.id === id);
        this.products.splice(index, 1);
        this.products = [...this.products];

      }
    });

  }
}
