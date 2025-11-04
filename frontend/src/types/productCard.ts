import type { Product } from './product'

export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}
