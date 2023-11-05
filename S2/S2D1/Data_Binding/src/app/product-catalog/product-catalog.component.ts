// src/app/product-catalog/product-catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})


export class ProductCatalogComponent implements OnInit {
  products: Product[] = [];
  favorites: Product[] = [];
  cart: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  viewDetails(product: Product): void {
    // Implement logic to show more details for the selected product
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  toggleFavorite(product: Product): void {
    if (this.favorites.includes(product)) {
      this.favorites = this.favorites.filter(p => p !== product);
    } else {
      this.favorites.push(product);
    }
  }
}