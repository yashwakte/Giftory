import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HamperService } from './services/hamper.service';
import { CartService } from '../cart/services/cart.service';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { HamperSize, GiftWrapTier, HAMPER_SIZES, GIFT_WRAP_TIERS } from './models/hamper.model';

@Component({
  selector: 'app-hamper-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hamper-builder.component.html',
  styleUrls: ['./hamper-builder.component.scss'],
})
export class HamperBuilderComponent implements OnInit {
  availableProducts = signal<Product[]>([]);
  hamperSizes = HAMPER_SIZES;
  giftWrapTiers = GIFT_WRAP_TIERS;

  // Pagination
  currentPage = signal<number>(1);
  itemsPerPage = 16;

  // Paginated products
  paginatedProducts = computed(() => {
    const products = this.availableProducts();
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return products.slice(startIndex, endIndex);
  });

  totalPages = computed(() => Math.ceil(this.availableProducts().length / this.itemsPerPage));

  // Form fields
  customName = signal<string>('My Custom Hamper');
  giftMessage = signal<string>('');
  recipientName = signal<string>('');

  // UI state
  showCustomization = signal<boolean>(false);
  successMessage = signal<string>('');

  constructor(
    public hamperService: HamperService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Get products suitable for hampers (you can filter by specific categories)
    const allProducts = this.productService.getProducts();
    this.availableProducts.set(allProducts);

    // Initialize with a medium hamper if not already started
    if (!this.hamperService.hamper()) {
      this.hamperService.startNewHamper('medium');
    }
  }

  // Size selection
  selectSize(size: HamperSize): void {
    this.hamperService.updateHamperSize(size);
  }

  isSelectedSize(size: HamperSize): boolean {
    return this.hamperService.hamper()?.size === size;
  }

  // Add/Remove items
  toggleProduct(product: Product): void {
    if (this.hamperService.isProductInHamper(product.id)) {
      this.hamperService.removeItemFromHamper(product.id);
    } else {
      const added = this.hamperService.addItemToHamper(product);
      if (!added && this.hamperService.isFull()) {
        alert('Hamper is full! Please remove an item or choose a larger size.');
      } else if (!added) {
        alert('This item is already in your hamper.');
      }
    }
  }

  // Gift wrap selection
  selectGiftWrap(tier: GiftWrapTier): void {
    this.hamperService.updateGiftWrap(tier);
  }

  isSelectedGiftWrap(tier: GiftWrapTier): boolean {
    return this.hamperService.hamper()?.giftWrapTier === tier;
  }

  // Toggle customization panel
  toggleCustomization(): void {
    this.showCustomization.update((v) => !v);
  }

  // Update customization fields
  updateCustomName(): void {
    this.hamperService.updateHamperName(this.customName());
  }

  updateGiftMessage(): void {
    this.hamperService.updateGiftMessage(this.giftMessage());
  }

  updateRecipientName(): void {
    this.hamperService.updateRecipientName(this.recipientName());
  }

  // Add to cart
  addToCart(): void {
    const hamper = this.hamperService.hamper();
    if (!hamper || hamper.items.length === 0) {
      alert('Please add at least one item to your hamper.');
      return;
    }

    // Update hamper with latest customization
    this.hamperService.updateHamperName(this.customName());
    this.hamperService.updateGiftMessage(this.giftMessage());
    this.hamperService.updateRecipientName(this.recipientName());

    const updatedHamper = this.hamperService.hamper()!;
    const totalPrice = this.hamperService.totalPrice();

    this.cartService.addHamper(updatedHamper, totalPrice);

    // Show success message
    this.successMessage.set(`${updatedHamper.hamperName} added to cart!`);
    setTimeout(() => this.successMessage.set(''), 3000);

    // Clear the hamper for next one
    this.hamperService.clearHamper();
    this.hamperService.startNewHamper('medium');

    // Reset form
    this.customName.set('My Custom Hamper');
    this.giftMessage.set('');
    this.recipientName.set('');
    this.showCustomization.set(false);
  }

  // View cart
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // Clear hamper
  clearHamper(): void {
    if (confirm('Are you sure you want to clear this hamper?')) {
      this.hamperService.clearHamper();
      this.hamperService.startNewHamper('medium');
      this.customName.set('My Custom Hamper');
      this.giftMessage.set('');
      this.recipientName.set('');
    }
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      // Scroll to top of products section
      document.querySelector('.products-column')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page and surrounding pages
      pages.push(1);

      if (current > 3) {
        pages.push(-1); // -1 represents ellipsis
      }

      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      pages.push(total);
    }

    return pages;
  }
}
