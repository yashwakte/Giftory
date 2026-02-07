import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CartService } from '../cart/services/cart.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { Product } from './models/product.model';
import { HamperBuilderComponent } from './hamper-builder.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, HamperBuilderComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  allProducts = signal<Product[]>([]);
  currentCategory = signal<string>('');
  searchQuery = signal<string>('');
  sortBy = signal<string>('name');

  // Check if we're in personalized category (hamper builder mode)
  isPersonalizedCategory = computed(() => this.currentCategory() === 'personalized');

  filteredProducts = computed(() => {
    let products = this.allProducts();

    // Filter by category
    const category = this.currentCategory();
    if (category && category !== 'personalized') {
      products = products.filter((p) => p.category === category);
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase();
    if (query) {
      products = products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query),
      );
    }

    // Sort products
    const sort = this.sortBy();
    if (sort === 'price-asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  });

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.allProducts.set(this.productService.getProducts());

    // Check if we're in a category route
    this.route.url.subscribe((segments) => {
      if (segments.length > 1 && segments[0].path === 'category') {
        this.currentCategory.set(segments[1].path);
      } else {
        this.currentCategory.set('');
      }
    });
  }

  getCategoryTitle(): string {
    const category = this.currentCategory();
    if (!category) return 'All Gifts';

    const titles: { [key: string]: string } = {
      birthday: 'Birthday Gifts',
      anniversary: 'Anniversary Gifts',
      'for-him': 'Gifts For Him',
      'for-her': 'Gifts For Her',
      personalized: 'Personalized Gifts',
    };

    return titles[category] || 'All Gifts';
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.cartService.addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    alert(`${product.name} added to cart!`);
  }

  toggleWishlist(product: Product, event: Event): void {
    event.stopPropagation();
    const added = this.wishlistService.toggleWishlist(product);
    if (added) {
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} removed from wishlist!`);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  buyNow(product: Product, event: Event): void {
    event.stopPropagation();
    this.addToCart(product, event);
    this.router.navigate(['/checkout']);
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }

  onSortChange(value: string): void {
    this.sortBy.set(value);
  }
}
