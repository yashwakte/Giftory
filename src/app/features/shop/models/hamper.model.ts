export type HamperSize = 'small' | 'medium' | 'large';
export type GiftWrapTier = 'basic' | 'premium' | 'luxury';

export interface HamperItem {
  productId: number;
  productName: string;
  price: number;
  imageUrl?: string;
}

export interface CustomHamper {
  id: string; // Unique identifier for the hamper
  hamperName: string;
  size: HamperSize;
  items: HamperItem[];
  giftWrapTier: GiftWrapTier;
  giftMessage?: string;
  recipientName?: string;
  createdAt: Date;
}

export interface HamperConfig {
  size: HamperSize;
  maxItems: number;
  basePrice: number; // Price for the hamper basket & basic wrapping
  label: string;
  description: string;
}

export interface GiftWrapConfig {
  tier: GiftWrapTier;
  price: number;
  label: string;
  features: string[];
}

// Hamper size configurations
export const HAMPER_SIZES: HamperConfig[] = [
  {
    size: 'small',
    maxItems: 3,
    basePrice: 99,
    label: 'Small Hamper',
    description: 'Perfect for a thoughtful gesture (Up to 3 items)',
  },
  {
    size: 'medium',
    maxItems: 5,
    basePrice: 149,
    label: 'Medium Hamper',
    description: 'Great for special occasions (Up to 5 items)',
  },
  {
    size: 'large',
    maxItems: 8,
    basePrice: 249,
    label: 'Large Hamper',
    description: 'Ultimate luxury collection (Up to 8 items)',
  },
];

// Gift wrap tier configurations
export const GIFT_WRAP_TIERS: GiftWrapConfig[] = [
  {
    tier: 'basic',
    price: 0,
    label: 'Basic Wrapping',
    features: ['Standard gift wrap', 'Greeting card', 'Ribbon'],
  },
  {
    tier: 'premium',
    price: 99,
    label: 'Premium Wrapping',
    features: ['Designer gift wrap', 'Premium card', 'Satin ribbon', 'Gift tag'],
  },
  {
    tier: 'luxury',
    price: 199,
    label: 'Luxury Wrapping',
    features: [
      'Luxury gift box',
      'Handmade card',
      'Silk ribbon',
      'Personalized tags',
      'Decorative elements',
    ],
  },
];
