import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(item: CartItem): void {
    this.items.push(item);
  }

  clearCart(): void {
    this.items = [];
  }
}
