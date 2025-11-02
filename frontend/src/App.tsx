import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import type { CartItem } from './types/cartItem'
import type { Product } from './types/product'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Mock product data
  

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    setShowMobileMenu(false)
  }
  return (
    <div className='min-h-screen bg-white'>
      <Header
        cartCount={getTotalCartItems()}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
      />
      <p className='text-red-500'>Nguyễn Thiên Ân</p>
    </div>
  )
}

export default App
