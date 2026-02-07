import { Injectable, signal, computed } from '@angular/core';
import {
  CustomHamper,
  HamperItem,
  HamperSize,
  GiftWrapTier,
  HAMPER_SIZES,
  GIFT_WRAP_TIERS,
} from '../models/hamper.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class HamperService {
  // Current hamper being built
  private currentHamper = signal<CustomHamper | null>(null);

  // Computed values
  hamper = this.currentHamper.asReadonly();

  items = computed(() => this.currentHamper()?.items || []);

  itemCount = computed(() => this.items().length);

  maxItems = computed(() => {
    const size = this.currentHamper()?.size || 'small';
    return HAMPER_SIZES.find((h) => h.size === size)?.maxItems || 3;
  });

  isFull = computed(() => this.itemCount() >= this.maxItems());

  canAddMore = computed(() => !this.isFull());

  totalItemsPrice = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));

  hamperBasePrice = computed(() => {
    const size = this.currentHamper()?.size || 'small';
    return HAMPER_SIZES.find((h) => h.size === size)?.basePrice || 99;
  });

  giftWrapPrice = computed(() => {
    const tier = this.currentHamper()?.giftWrapTier || 'basic';
    return GIFT_WRAP_TIERS.find((w) => w.tier === tier)?.price || 0;
  });

  totalPrice = computed(
    () => this.totalItemsPrice() + this.hamperBasePrice() + this.giftWrapPrice(),
  );

  /**
   * Initialize a new hamper
   */
  startNewHamper(size: HamperSize = 'medium'): void {
    this.currentHamper.set({
      id: this.generateHamperId(),
      hamperName: 'My Custom Hamper',
      size,
      items: [],
      giftWrapTier: 'basic',
      createdAt: new Date(),
    });
  }

  /**
   * Add a product to the hamper
   */
  addItemToHamper(product: Product): boolean {
    const hamper = this.currentHamper();
    if (!hamper) {
      this.startNewHamper();
      return this.addItemToHamper(product);
    }

    if (this.isFull()) {
      return false;
    }

    // Check if item already exists
    const exists = hamper.items.some((item) => item.productId === product.id);
    if (exists) {
      return false;
    }

    const hamperItem: HamperItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };

    this.currentHamper.update((h) => {
      if (!h) return h;
      return { ...h, items: [...h.items, hamperItem] };
    });

    return true;
  }

  /**
   * Remove an item from the hamper
   */
  removeItemFromHamper(productId: number): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;
      return {
        ...hamper,
        items: hamper.items.filter((item) => item.productId !== productId),
      };
    });
  }

  /**
   * Update hamper size
   */
  updateHamperSize(size: HamperSize): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;

      const maxItems = HAMPER_SIZES.find((h) => h.size === size)?.maxItems || 3;
      const items = hamper.items.slice(0, maxItems);

      return { ...hamper, size, items };
    });
  }

  /**
   * Update gift wrap tier
   */
  updateGiftWrap(tier: GiftWrapTier): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;
      return { ...hamper, giftWrapTier: tier };
    });
  }

  /**
   * Update hamper name
   */
  updateHamperName(name: string): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;
      return { ...hamper, hamperName: name };
    });
  }

  /**
   * Update gift message
   */
  updateGiftMessage(message: string): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;
      return { ...hamper, giftMessage: message };
    });
  }

  /**
   * Update recipient name
   */
  updateRecipientName(name: string): void {
    this.currentHamper.update((hamper) => {
      if (!hamper) return hamper;
      return { ...hamper, recipientName: name };
    });
  }

  /**
   * Clear the current hamper
   */
  clearHamper(): void {
    this.currentHamper.set(null);
  }

  /**
   * Check if a product is in the hamper
   */
  isProductInHamper(productId: number): boolean {
    return this.items().some((item) => item.productId === productId);
  }

  /**
   * Generate a unique hamper ID
   */
  private generateHamperId(): string {
    return `hamper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
