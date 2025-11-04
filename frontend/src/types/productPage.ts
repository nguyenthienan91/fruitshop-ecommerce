import type { Product } from './product'

export interface ProductsPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
}
