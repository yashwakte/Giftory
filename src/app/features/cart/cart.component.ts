import { Component, inject, signal } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../shared/services/wishlist.service';
import { ProductService } from '../shop/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  wishlistService = inject(WishlistService);
  private productService = inject(ProductService);

  items: CartItem[] = [];
  expandedHampers = signal<Set<number>>(new Set());

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get estimatedTotal(): number {
    return this.subtotal;
  }

  isHamperExpanded(productId: number): boolean {
    return this.expandedHampers().has(productId);
  }

  toggleHamperDetails(productId: number): void {
    this.expandedHampers.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }

  updateQuantity(item: CartItem, event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (value > 0) {
      item.quantity = value;
      this.persistCart();
    }
  }

  adjustQuantity(item: CartItem, delta: number) {
    const next = Math.max(1, item.quantity + delta);
    item.quantity = next;
    this.persistCart();
  }

  removeItem(item: CartItem) {
    this.items = this.items.filter((i) => i !== item);
    this.persistCart();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  private persistCart() {
    this.cartService.clearCart();
    this.items.forEach((i) => this.cartService.addItem(i));
  }

  moveToWishlist(item: CartItem): void {
    // Find the product from the product service
    const product = this.productService.getProductById(item.productId);
    if (product) {
      this.wishlistService.addToWishlist(product);
      this.removeItem(item);
    }
  }

  moveToCart(productId: number): void {
    const product = this.productService.getProductById(productId);
    if (product) {
      this.cartService.addItem({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        isHamper: false,
      });
      this.wishlistService.removeFromWishlist(productId);
      this.items = this.cartService.getItems();
    }
  }
}
