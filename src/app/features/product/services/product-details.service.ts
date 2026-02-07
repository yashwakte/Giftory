import { Injectable, inject } from '@angular/core';
import { ProductDetails } from '../models/product-details.model';
import { ProductService } from '../../shop/services/product.service';

@Injectable({ providedIn: 'root' })
export class ProductDetailsService {
  private productService = inject(ProductService);

  getProductDetails(id: number): ProductDetails | null {
    const product = this.productService.getProductById(id);
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description || 'No description available',
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    };
  }
}
