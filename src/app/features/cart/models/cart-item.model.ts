import { CustomHamper } from '../../shop/models/hamper.model';

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  isHamper?: boolean; // Flag to identify hamper items
  hamperData?: CustomHamper; // Complete hamper details if it's a hamper
}
