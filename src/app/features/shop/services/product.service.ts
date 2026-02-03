import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Product[] {
    return [
      { id: 1, name: 'Explosion Box', price: 799, category: 'bestseller' },
      { id: 2, name: 'Photo Lamp', price: 999, category: 'bestseller' },
      { id: 3, name: 'Chocolate Bouquet', price: 599, category: 'bestseller' },
      { id: 4, name: 'Custom Mug', price: 349, category: 'bestseller' },
    ];
  }
}
