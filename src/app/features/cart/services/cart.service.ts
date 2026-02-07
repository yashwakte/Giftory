import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

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

  clearCart(): void {
    this.items = [];
  }
}
