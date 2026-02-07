import { Component, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  items: CartItem[] = [];

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
}
