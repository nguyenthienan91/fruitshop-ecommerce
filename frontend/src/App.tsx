import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import type { CartItem } from './types/cartItem'
import type { Product } from './types/product'
import { HomePage } from './components/HomePage'
import { Footer } from './components/Footer'
import { mockProducts } from './mockData/mockProducts'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ProductsPage } from './components/ProductsPage'
import { ProductDetailPage } from './components/ProductDetailPage'
import { AuthPage } from './components/AuthPage'
import { CartPage } from './components/CardPage'

function App() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }
  const handleNavigate = (page: string) => {
    navigate(`/${page}`)
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
    navigate('/product-detail')
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header
        cartCount={getTotalCartItems()}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
      />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className='fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden'>
          <div className='fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6'>
            <div className='flex flex-col space-y-4'>
              <button onClick={() => handleNavigate('home')} className='text-left p-2 hover:bg-gray-100 rounded'>
                Trang chủ
              </button>
              <button onClick={() => handleNavigate('products')} className='text-left p-2 hover:bg-gray-100 rounded'>
                Sản phẩm
              </button>
              <button onClick={() => handleNavigate('auth')} className='text-left p-2 hover:bg-gray-100 rounded'>
                Tài khoản
              </button>
              <button onClick={() => handleNavigate('cart')} className='text-left p-2 hover:bg-gray-100 rounded'>
                Giỏ hàng ({getTotalCartItems()})
              </button>
            </div>
          </div>
        </div>
      )}

      <main className='flex-1'>
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                products={mockProducts}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
                onNavigate={handleNavigate}
              />
            }
          />
          <Route
            path='products'
            element={
              <ProductsPage products={mockProducts} onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />
            }
          />
          <Route
            path='product-detail'
            element={
              <ProductDetailPage product={selectedProduct} onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
            }
          />
          <Route path='auth' element={<AuthPage />} />
          <Route
            path='cart'
            element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onNavigate={handleNavigate}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
