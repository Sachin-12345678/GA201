import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Placeholder for product data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    // Exercise 1: Make an HTTP GET request to the API and log the data to the console
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe(
      (data) => {
        console.log('Fetched Products:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Exercise 4: Implement a click event handler for product cards
  onCardClick(product: any) {
    console.log('Clicked on:', product);
  }
}
