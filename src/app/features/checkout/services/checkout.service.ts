import { Injectable } from '@angular/core';
import { CheckoutInfo } from '../models/checkout-info.model';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  submitOrder(info: CheckoutInfo): void {
    // Simulate order submission
    console.log('Order submitted', info);
  }
}
