import { Injectable, signal, computed } from '@angular/core';

export interface UserAddress {
  id: string;
  label: string; // Home, Office, etc.
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'delivered' | 'in-transit' | 'processing' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: UserAddress;
  trackingNumber?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateJoined: Date;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Signals for reactive user data
  private _user = signal<UserProfile | null>({
    id: 'user_1',
    email: 'riya.kumari@gmail.com',
    firstName: 'Riya',
    lastName: 'Kumari',
    phone: '+91 98765 43210',
    dateJoined: new Date('2022-08-06'),
    avatarUrl: undefined,
  });

  private _addresses = signal<UserAddress[]>([
    {
      id: 'addr_1',
      label: 'Home',
      fullName: 'Riya Kumari',
      phone: '+91 98765 43210',
      addressLine1: 'C2 Pods, Jagatganj',
      addressLine2: 'Near Metro Station',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001',
      isDefault: true,
    },
    {
      id: 'addr_2',
      label: 'Office',
      fullName: 'Riya Kumari',
      phone: '+91 98765 43210',
      addressLine1: 'Vasanta Ashram, Phase 2',
      addressLine2: 'Rajghat',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      pincode: '221001',
      isDefault: false,
    },
  ]);

  private _orders = signal<Order[]>([
    {
      id: 'order_1',
      orderNumber: 'GFT2024010001',
      date: new Date('2024-01-15'),
      status: 'delivered',
      items: [
        {
          productId: 'prod_1',
          name: 'Premium Chocolate Gift Box',
          quantity: 1,
          price: 1299,
          image: '/assets/products/chocolate-box.jpg',
        },
        {
          productId: 'prod_2',
          name: 'Personalized Photo Frame',
          quantity: 1,
          price: 899,
          image: '/assets/products/photo-frame.jpg',
        },
      ],
      total: 2198,
      shippingAddress: {
        id: 'addr_1',
        label: 'Home',
        fullName: 'Riya Kumari',
        phone: '+91 98765 43210',
        addressLine1: 'C2 Pods, Jagatganj',
        addressLine2: 'Near Metro Station',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221001',
        isDefault: true,
      },
      trackingNumber: 'TRK1234567890',
    },
    {
      id: 'order_2',
      orderNumber: 'GFT2024010045',
      date: new Date('2024-01-28'),
      status: 'in-transit',
      items: [
        {
          productId: 'prod_3',
          name: 'Custom Gift Hamper - Medium',
          quantity: 1,
          price: 2499,
          image: '/assets/products/hamper.jpg',
        },
      ],
      total: 2499,
      shippingAddress: {
        id: 'addr_2',
        label: 'Office',
        fullName: 'Riya Kumari',
        phone: '+91 98765 43210',
        addressLine1: 'Vasanta Ashram, Phase 2',
        addressLine2: 'Rajghat',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221001',
        isDefault: false,
      },
      trackingNumber: 'TRK9876543210',
    },
    {
      id: 'order_3',
      orderNumber: 'GFT2024020012',
      date: new Date('2024-02-05'),
      status: 'processing',
      items: [
        {
          productId: 'prod_4',
          name: 'Wireless Earbuds with Charging Case',
          quantity: 1,
          price: 3499,
          image: '/assets/products/earbuds.jpg',
        },
      ],
      total: 3499,
      shippingAddress: {
        id: 'addr_1',
        label: 'Home',
        fullName: 'Riya Kumari',
        phone: '+91 98765 43210',
        addressLine1: 'C2 Pods, Jagatganj',
        addressLine2: 'Near Metro Station',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        pincode: '221001',
        isDefault: true,
      },
    },
  ]);

  // Public computed signals
  user = this._user.asReadonly();
  addresses = this._addresses.asReadonly();
  orders = this._orders.asReadonly();

  // Computed values
  fullName = computed(() => {
    const u = this._user();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  defaultAddress = computed(() => {
    return this._addresses().find((addr) => addr.isDefault);
  });

  totalOrders = computed(() => this._orders().length);

  // Methods
  updateProfile(updates: Partial<UserProfile>): void {
    const current = this._user();
    if (current) {
      this._user.set({ ...current, ...updates });
    }
  }

  addAddress(address: UserAddress): void {
    this._addresses.update((addresses) => [...addresses, address]);
  }

  updateAddress(id: string, updates: Partial<UserAddress>): void {
    this._addresses.update((addresses) =>
      addresses.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr)),
    );
  }

  deleteAddress(id: string): void {
    this._addresses.update((addresses) => addresses.filter((addr) => addr.id !== id));
  }

  setDefaultAddress(id: string): void {
    this._addresses.update((addresses) =>
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  }

  getOrderById(id: string): Order | undefined {
    return this._orders().find((order) => order.id === id);
  }

  isAuthenticated(): boolean {
    return this._user() !== null;
  }

  logout(): void {
    this._user.set(null);
    this._addresses.set([]);
    this._orders.set([]);
  }
}
