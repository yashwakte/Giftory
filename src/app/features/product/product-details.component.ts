import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { ProductDetails } from './models/product-details.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductDetailsService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private router = inject(Router);

  product: ProductDetails | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductDetails(id);
  }

  getCategoryName(): string {
    const categories: { [key: string]: string } = {
      birthday: 'Birthday Gifts',
      anniversary: 'Anniversary Gifts',
      'for-him': 'For Him',
      'for-her': 'For Her',
      personalized: 'Personalized',
    };
    return categories[this.product?.category || ''] || 'Gift';
  }

  isInWishlist(): boolean {
    if (!this.product) return false;
    return this.wishlistService.isInWishlist(this.product.id);
  }

  toggleWishlist(): void {
    if (!this.product) return;

    const added = this.wishlistService.toggleWishlist({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      category: this.product.category,
      description: this.product.description,
    });

    if (added) {
      alert(`${this.product.name} added to wishlist!`);
    } else {
      alert(`${this.product.name} removed from wishlist!`);
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addItem({
        productId: this.product.id,
        productName: this.product.name,
        price: this.product.price,
        quantity: 1,
        imageUrl: this.product.imageUrl,
      });
      alert(`${this.product.name} added to cart!`);
    }
  }

  buyNow() {
    if (this.product) {
      this.addToCart();
      this.router.navigate(['/checkout']);
    }
  }
}
