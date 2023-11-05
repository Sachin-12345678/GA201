import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    {
       name: "Samsung 32-inch LED Monitor",
       description: "Full HD monitor with vibrant colors and sleek design.",
       price: 199.99,
       image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua32t4340akxxl/gallery/in-hd-tv-ua32t4340akxxl-front-black-thumb-537470102"
    },
    {
       name: "LG 27-inch 4K Ultra HD Monitor",
       description: "Stunning 4K resolution display for crisp visuals.",
       price: 349.99,
       image: "https://abmgroup.in/cdn/shop/products/32N4003_grande.jpg?v=1571751602"
    },
    {
       name: "Dell 24-inch IPS Monitor",
       description: "Precise color accuracy and wide viewing angles.",
       price: 149.99,
       image: "https://5.imimg.com/data5/SELLER/Default/2021/2/IT/WK/IT/49082557/24-inch-dell-led-monitor-500x500.jpg"
    },
    {
       name: "ASUS 34-inch Curved Gaming Monitor",
       description: "Immersive gaming experience with a curved display.",
       price: 499.99,
       image: "https://www.price-hunt.com/content/images/laptops/asus-mini-laptop_l.jpeg"
    },
    {
      name: "LG 27-inch 4K Ultra HD Monitor",
      description: "Stunning 4K resolution display for crisp visuals.",
      price: 349.99,
      image: "https://abmgroup.in/cdn/shop/products/32N4003_grande.jpg?v=1571751602"
   },
   {
    name: "ASUS 34-inch Curved Gaming Monitor",
    description: "Immersive gaming experience with a curved display.",
    price: 499.99,
    image: "https://www.price-hunt.com/content/images/laptops/asus-mini-laptop_l.jpeg"
 },
 {
  name: "Samsung 32-inch LED Monitor",
  description: "Full HD monitor with vibrant colors and sleek design.",
  price: 199.99,
  image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua32t4340akxxl/gallery/in-hd-tv-ua32t4340akxxl-front-black-thumb-537470102"
}
    
    
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }
}
