import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../shop/services/product.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CartService } from '../cart/services/cart.service';
import { Product } from '../shop/models/product.model';

interface CategoryItem {
  name: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bestSellers = signal<Product[]>([]);
  newArrivals = signal<Product[]>([]);
  personalizedGifts = signal<Product[]>([]);

  occasionCategories = [
    { label: "Valentine's Day", route: '/shop', icon: 'assets/occasions/valentines-day.svg' },
    { label: 'Birthday', route: '/category/birthday', icon: 'assets/occasions/birthday.svg' },
    {
      label: 'Anniversary',
      route: '/category/anniversary',
      icon: 'assets/occasions/anniversary.svg',
    },
    { label: 'Wedding', route: '/shop', icon: 'assets/occasions/wedding.svg' },
    { label: "Father's Day", route: '/shop', icon: 'assets/occasions/fathers-day.svg' },
    { label: "Mother's Day", route: '/shop', icon: 'assets/occasions/mothers-day.svg' },
    { label: 'Friendship Day', route: '/shop', icon: 'assets/occasions/friendship-day.svg' },
  ];

  relationshipCategories = [
    { label: 'Boyfriend', route: '/category/for-him', icon: 'assets/relationships/boyfriend.svg' },
    {
      label: 'Girlfriend',
      route: '/category/for-her',
      icon: 'assets/relationships/girlfriend.svg',
    },
    { label: 'Husband', route: '/category/for-him', icon: 'assets/relationships/husband.svg' },
    { label: 'Wife', route: '/category/for-her', icon: 'assets/relationships/wife.svg' },
    { label: 'Best Friend', route: '/shop', icon: 'assets/relationships/best-friend.svg' },
    { label: 'Casual Friend', route: '/shop', icon: 'assets/relationships/casual-friend.svg' },
    { label: 'Colleague', route: '/shop', icon: 'assets/relationships/colleague.svg' },
    { label: 'Clients', route: '/shop', icon: 'assets/relationships/clients.svg' },
    { label: 'Father', route: '/category/for-him', icon: 'assets/relationships/father.svg' },
    { label: 'Mother', route: '/category/for-her', icon: 'assets/relationships/mother.svg' },
  ];

  festivalCategories = [
    { label: 'Holi', route: '/shop', icon: 'assets/festivals/holi.svg' },
    { label: 'Diwali', route: '/shop', icon: 'assets/festivals/diwali.svg' },
    { label: 'Mahashivratri', route: '/shop', icon: 'assets/festivals/mahashivratri.svg' },
    { label: 'Chaturthi', route: '/shop', icon: 'assets/festivals/chaturthi.svg' },
    { label: 'Christmas', route: '/shop', icon: 'assets/festivals/christmas.svg' },
    { label: 'Rakhi', route: '/shop', icon: 'assets/festivals/rakhi.svg' },
    { label: 'Eid', route: '/shop', icon: 'assets/festivals/eid.svg' },
  ];

  categories: CategoryItem[] = [
    {
      name: 'valentines',
      label: "Valentine's Day",
      icon: 'assets/category-icons/valentines.svg',
      route: '/category/for-her',
    },
    {
      name: 'desk-calendars',
      label: 'Desk Calendars',
      icon: 'assets/category-icons/desk-calendars.svg',
      route: '/category/personalized',
    },
    {
      name: 'anniversary',
      label: 'Anniversary',
      icon: 'assets/category-icons/anniversary.jpg',
      route: '/category/anniversary',
    },
    {
      name: 'birthday',
      label: 'Birthday',
      icon: 'assets/category-icons/birthday.jpg',
      route: '/category/birthday',
    },
    {
      name: 'boyfriend',
      label: 'Boyfriend',
      icon: 'assets/category-icons/boyfriend.jpg',
      route: '/category/for-him',
    },
    {
      name: 'custom-hampers',
      label: 'Custom Hampers',
      icon: 'assets/category-icons/custom-hampers.svg',
      route: '/shop',
    },
    {
      name: 'girlfriend',
      label: 'Girlfriend',
      icon: 'assets/category-icons/girlfriend.jpg',
      route: '/category/for-her',
    },
    {
      name: 'home-decor',
      label: 'Home Decor',
      icon: 'assets/category-icons/home-decor.svg',
      route: '/shop',
    },
  ];

  mainCategories = [
    { label: 'Gifts by Occasions', route: '/category/birthday' },
    { label: 'Gifts by Relationships', route: '/category/for-him' },
    { label: 'Gifts by Festivals', route: '/shop' },
    { label: 'Personalized Gifts', route: '/category/personalized' },
  ];

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.bestSellers.set(this.productService.getBestSellers());
    this.newArrivals.set(this.productService.getNewArrivals());
    this.personalizedGifts.set(this.productService.getProductsByCategory('personalized'));
  }

  // Derived product groups for the home grids
  giftsByOccasions(): Product[] {
    return [
      ...this.productService.getProductsByCategory('birthday'),
      ...this.productService.getProductsByCategory('anniversary'),
    ];
  }

  giftsByRelationships(): Product[] {
    return [
      ...this.productService.getProductsByCategory('for-him'),
      ...this.productService.getProductsByCategory('for-her'),
    ];
  }

  giftsByFestivals(): Product[] {
    // Reuse a mix until festival-specific data exists
    return this.productService.getProducts().slice(0, 8);
  }

  giftsByPersonalized(): Product[] {
    return this.productService.getProductsByCategory('personalized');
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

  navigateToCategory(route: string): void {
    this.router.navigate([route]);
  }

  scrollSection(containerId: string, direction: 'left' | 'right'): void {
    const el = document.getElementById(containerId);
    if (!el) return;
    const distance = el.clientWidth * 0.8;
    el.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' });
  }
}
