import { Injectable } from '@angular/core';
import { ProductDetails } from '../models/product-details.model';

@Injectable({ providedIn: 'root' })
export class ProductDetailsService {
  getProductDetails(id: number): ProductDetails {
    // Example static data
    return {
      id,
      name: 'Explosion Box',
      description: 'A creative explosion box filled with memories.',
      price: 799,
      category: 'bestseller',
      imageUrl: '',
    };
  }
}
