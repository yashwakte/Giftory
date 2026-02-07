import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    // Birthday Gifts
    {
      id: 1,
      name: 'Explosion Box',
      description: 'Surprise explosion box with photos and messages',
      price: 799,
      imageUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400',
      category: 'birthday',
    },
    {
      id: 2,
      name: 'LED Photo Lamp',
      description: 'Personalized photo lamp with custom message',
      price: 999,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      category: 'birthday',
    },
    {
      id: 3,
      name: 'Birthday Gift Hamper',
      description: 'Curated gift hamper with premium items',
      price: 1499,
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
      category: 'birthday',
    },
    {
      id: 4,
      name: 'Personalized Mug',
      description: 'Custom printed photo mug',
      price: 349,
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
      category: 'birthday',
    },
    {
      id: 5,
      name: 'Birthday Cake',
      description: 'Delicious customized birthday cake',
      price: 899,
      imageUrl: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400',
      category: 'birthday',
    },

    // Anniversary Gifts
    {
      id: 6,
      name: 'Couple Photo Frame',
      description: 'Elegant frame for your special moments',
      price: 649,
      imageUrl: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=400',
      category: 'anniversary',
    },
    {
      id: 7,
      name: 'Romantic Scented Candles',
      description: 'Set of luxury scented candles',
      price: 799,
      imageUrl: 'https://images.unsplash.com/photo-1602874801006-e0c43a4e0b7d?w=400',
      category: 'anniversary',
    },
    {
      id: 8,
      name: 'Love Story Book',
      description: 'Personalized book with your love story',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      category: 'anniversary',
    },
    {
      id: 9,
      name: 'Couple Cushions',
      description: 'Matching cushions with your photos',
      price: 599,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      category: 'anniversary',
    },
    {
      id: 10,
      name: 'Jewelry Box',
      description: 'Premium wooden jewelry box',
      price: 1899,
      imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      category: 'anniversary',
    },

    // For Him
    {
      id: 11,
      name: 'Leather Wallet',
      description: 'Premium leather wallet with monogram',
      price: 1199,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
      category: 'for-him',
    },
    {
      id: 12,
      name: 'Watch',
      description: 'Stylish analog watch',
      price: 2499,
      imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400',
      category: 'for-him',
    },
    {
      id: 13,
      name: 'Grooming Kit',
      description: 'Complete grooming set for men',
      price: 1599,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'for-him',
    },
    {
      id: 14,
      name: 'Gaming Mouse',
      description: 'Professional gaming mouse',
      price: 1299,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      category: 'for-him',
    },
    {
      id: 15,
      name: 'Perfume Set',
      description: 'Premium cologne collection',
      price: 2199,
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      category: 'for-him',
    },

    // For Her
    {
      id: 16,
      name: 'Jewelry Set',
      description: 'Elegant necklace and earring set',
      price: 1899,
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      category: 'for-her',
    },
    {
      id: 17,
      name: 'Handbag',
      description: 'Designer handbag in multiple colors',
      price: 2999,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      category: 'for-her',
    },
    {
      id: 18,
      name: 'Makeup Kit',
      description: 'Professional makeup set',
      price: 1799,
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      category: 'for-her',
    },
    {
      id: 19,
      name: 'Flower Bouquet',
      description: 'Fresh roses bouquet',
      price: 699,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      category: 'for-her',
    },
    {
      id: 20,
      name: 'Spa Gift Set',
      description: 'Luxury spa and bath products',
      price: 1599,
      imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
      category: 'for-her',
    },

    // Personalized
    {
      id: 21,
      name: 'Photo Cushion',
      description: 'Cushion with your favorite photo',
      price: 449,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      category: 'personalized',
    },
    {
      id: 22,
      name: 'Name Plate',
      description: 'Customized nameplate for home/office',
      price: 599,
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      category: 'personalized',
    },
    {
      id: 23,
      name: 'Engraved Keychain',
      description: 'Metal keychain with custom engraving',
      price: 299,
      imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400',
      category: 'personalized',
    },
    {
      id: 24,
      name: 'Custom T-Shirt',
      description: 'T-shirt with your design or photo',
      price: 499,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'personalized',
    },
    {
      id: 25,
      name: 'Photo Calendar',
      description: 'Personalized desk calendar',
      price: 399,
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400',
      category: 'personalized',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getBestSellers(): Product[] {
    // Return first 8 products as bestsellers
    return this.products.slice(0, 8);
  }

  getNewArrivals(): Product[] {
    // Return last 8 products as new arrivals
    return this.products.slice(-8);
  }
}
