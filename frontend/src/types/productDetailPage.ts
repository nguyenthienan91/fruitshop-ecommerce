import type { Product } from './product'

export interface ProductDetailPageProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  onNavigate: (page: string) => void
}
