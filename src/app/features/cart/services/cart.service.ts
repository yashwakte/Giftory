import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CustomHamper } from '../../shop/models/hamper.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  // Computed values
  cartItems = this.items.asReadonly();

  itemCount = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  totalAmount = computed(() => {
    return this.items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  getItems(): CartItem[] {
    return this.items();
  }

  updateQuantity(productId: number, quantity: number): void {
    const nextQty = Math.max(1, quantity);
    this.items.update((items) => {
      const item = items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = nextQty;
      }
      return [...items];
    });
  }

  removeItem(productId: number): void {
    this.items.update((items) => items.filter((i) => i.productId !== productId));
  }

  addItem(item: CartItem): void {
    this.items.update((items) => [...items, item]);
  }

  /**
   * Add a custom hamper to cart as a single item
   */
  addHamper(hamper: CustomHamper, totalPrice: number): void {
    // Calculate a unique product ID for the hamper
    const hamperId = parseInt(hamper.id.replace(/\D/g, '').slice(0, 9)) || Date.now();

    const hamperCartItem: CartItem = {
      productId: hamperId,
      productName: hamper.hamperName || 'Custom Gift Hamper',
      price: totalPrice,
      quantity: 1,
      imageUrl: '/assets/hamper-default.png', // Default hamper image
      isHamper: true,
      hamperData: hamper,
    };

    this.items.update((items) => [...items, hamperCartItem]);
  }

  /**
   * Get only hamper items from cart
   */
  getHampers(): CartItem[] {
    return this.items().filter((item) => item.isHamper);
  }

  /**
   * Get only regular product items from cart
   */
  getRegularItems(): CartItem[] {
    return this.items().filter((item) => !item.isHamper);
  }

  clearCart(): void {
    this.items.set([]);
  }
}
