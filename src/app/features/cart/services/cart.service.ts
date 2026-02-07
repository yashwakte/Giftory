import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CustomHamper } from '../../shop/models/hamper.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  updateQuantity(productId: number, quantity: number): void {
    const nextQty = Math.max(1, quantity);
    const item = this.items.find((i) => i.productId === productId);
    if (!item) {
      return;
    }
    item.quantity = nextQty;
  }

  removeItem(productId: number): void {
    const index = this.items.findIndex((i) => i.productId === productId);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  addItem(item: CartItem): void {
    this.items.push(item);
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

    this.items.push(hamperCartItem);
  }

  /**
   * Get only hamper items from cart
   */
  getHampers(): CartItem[] {
    return this.items.filter((item) => item.isHamper);
  }

  /**
   * Get only regular product items from cart
   */
  getRegularItems(): CartItem[] {
    return this.items.filter((item) => !item.isHamper);
  }

  clearCart(): void {
    this.items = [];
  }
}
