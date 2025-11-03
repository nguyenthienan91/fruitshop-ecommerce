import type { Product } from './product'

export interface HomePageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onViewProduct: (product: Product) => void
  onNavigate: (page: string) => void
}
