import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import type { CartItem } from './types/cartItem'
import type { Product } from './types/product'
import { HomePage } from './components/HomePage'
import { Footer } from './components/Footer'
import { mockProducts } from './mockData/mockProducts'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setShowMobileMenu(false)
  }
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Show success message
    alert(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={mockProducts}
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
            onNavigate={handleNavigate}
          />
        )
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header
        cartCount={getTotalCartItems()}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
      />

      <main className='flex-1'>{renderCurrentPage()}</main>

      <Footer />
    </div>
  )
}

export default App
