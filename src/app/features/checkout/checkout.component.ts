import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CheckoutService } from './services/checkout.service';
import { CheckoutInfo } from './models/checkout-info.model';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart/models/cart-item.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  private router = inject(Router);

  items: CartItem[] = this.cartService.getItems();
  selectedItems = signal<Set<number>>(new Set(this.items.map((item) => item.productId)));
  info: CheckoutInfo = {
    name: '',
    address: '',
    paymentMethod: 'cod',
  };
  submitted = false;
  showCouponModal = false;
  selectedCoupon = '';
  couponInput = '';
  appliedCoupon = '';
  couponMessage = '';
  discountPercent = 0;

  private couponMinAmount(code: string): number | null {
    const normalized = code.toLowerCase();
    if (normalized === 'flat30') {
      return 2999;
    }
    if (normalized === 'flat15') {
      return 1999;
    }
    if (normalized === 'flat10') {
      return 999;
    }
    return null; // Unknown codes have no predefined gate
  }

  get pendingCoupon(): string {
    return (this.selectedCoupon || this.couponInput || '').trim();
  }

  get isCouponEligible(): boolean {
    const code = this.pendingCoupon;
    if (!code) {
      return false;
    }
    const min = this.couponMinAmount(code);
    if (min === null) {
      return true;
    }
    return this.subtotal >= min;
  }

  get couponShortfall(): number {
    const code = this.pendingCoupon;
    const min = this.couponMinAmount(code);
    if (min === null) {
      return 0;
    }
    return Math.max(0, min - this.subtotal);
  }

  get itemCount(): number {
    return this.getSelectedItems().reduce((count, item) => count + (item.quantity || 0), 0);
  }

  get subtotal(): number {
    return this.getSelectedItems().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get deliveryFee(): number {
    return this.getSelectedItems().length ? 49 : 0;
  }

  get total(): number {
    return this.subtotal + this.deliveryFee;
  }

  get discountAmount(): number {
    return Math.round((this.subtotal * this.discountPercent) / 100);
  }

  get payableTotal(): number {
    return Math.max(0, this.total - this.discountAmount);
  }

  isItemSelected(productId: number): boolean {
    return this.selectedItems().has(productId);
  }

  toggleItemSelection(productId: number): void {
    this.selectedItems.update((selected) => {
      const newSet = new Set(selected);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }

  getSelectedItems(): CartItem[] {
    return this.items.filter((item) => this.selectedItems().has(item.productId));
  }

  private refreshItems(): void {
    this.items = [...this.cartService.getItems()];
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, (item.quantity || 1) + 1);
    this.refreshItems();
  }

  decreaseQuantity(item: CartItem): void {
    const nextQty = (item.quantity || 1) - 1;
    if (nextQty <= 0) {
      this.removeItem(item.productId);
      return;
    }
    this.cartService.updateQuantity(item.productId, nextQty);
    this.refreshItems();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.refreshItems();
  }

  toggleCouponModal(): void {
    this.couponMessage = '';
    this.showCouponModal = !this.showCouponModal;
  }

  applyCoupon(): void {
    const code = this.pendingCoupon;
    if (!code) {
      this.couponMessage = 'Select or enter a coupon to apply.';
      return;
    }

    if (!this.isCouponEligible) {
      this.couponMessage = this.couponShortfall
        ? `Add ₹${this.couponShortfall} more to use this coupon.`
        : 'This coupon is not applicable for the current cart value.';
      return;
    }

    const normalized = code.toLowerCase();
    const percent = this.getEligibleDiscount(normalized);

    if (percent === 0) {
      this.couponMessage = 'This coupon is invalid for this cart.';
      this.appliedCoupon = '';
      this.discountPercent = 0;
      return;
    }

    this.appliedCoupon = code.toUpperCase();
    this.discountPercent = percent;
    this.couponMessage = `Applied ${this.appliedCoupon} for ${percent}% off.`;
    this.showCouponModal = false;
  }

  private getEligibleDiscount(code: string): number {
    const subtotal = this.subtotal;
    if (subtotal >= 2999 && code === 'flat30') {
      return 30;
    }
    if (subtotal >= 1999 && code === 'flat15') {
      return 15;
    }
    if (subtotal >= 999 && code === 'flat10') {
      return 10;
    }
    return 0;
  }

  submitOrder(): void {
    const selectedItems = this.getSelectedItems();
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout');
      return;
    }
    this.checkoutService.submitOrder(this.info);
    // Remove only selected items from cart
    selectedItems.forEach((item) => this.cartService.removeItem(item.productId));
    this.items = [];
    this.submitted = true;
    setTimeout(() => this.router.navigate(['/']), 2000);
  }
}
