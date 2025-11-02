export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  isNew?: boolean;
  discount?: number;
}