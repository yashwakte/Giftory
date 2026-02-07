import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../features/shop/models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistItems = signal<Product[]>([]);

  // Public readonly signals
  getWishlist() {
    return this.wishlistItems.asReadonly();
  }

  // Computed count for badge
  wishlistCount = computed(() => this.wishlistItems().length);

  addToWishlist(product: Product): void {
    const current = this.wishlistItems();
    if (!current.find((p) => p.id === product.id)) {
      this.wishlistItems.set([...current, product]);
    }
  }

  removeFromWishlist(productId: number): void {
    const current = this.wishlistItems();
    this.wishlistItems.set(current.filter((p) => p.id !== productId));
  }

  toggleWishlist(product: Product): boolean {
    const current = this.wishlistItems();
    const exists = current.find((p) => p.id === product.id);

    if (exists) {
      this.removeFromWishlist(product.id);
      return false;
    } else {
      this.addToWishlist(product);
      return true;
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems().some((p) => p.id === productId);
  }

  clearWishlist(): void {
    this.wishlistItems.set([]);
  }
}
