import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import type { Product } from '~/types/product'
import { Button } from '~/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/ui/card'
import { ImageWithFallback } from '~/ui/ImageWithFallback'
import { Input } from '~/ui/input'
import { Separator } from '~/ui/separator'

export interface CartItem extends Product {
  quantity: number
}

interface CartPageProps {
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onNavigate: (page: string) => void
}

export const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }: CartPageProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 200000 ? 0 : 30000
  const total = subtotal + shippingFee

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <Card className='max-w-md mx-auto text-center p-8'>
          <CardContent className='p-0 space-y-4'>
            <div className='text-6xl mb-4'>🛒</div>
            <h2 className='text-2xl font-bold'>Giỏ hàng trống</h2>
            <p className='text-gray-600'>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Button onClick={() => onNavigate('products')} className='w-full'>
              <ShoppingBag className='h-4 w-4 mr-2' />
              Tiếp tục mua sắm
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Giỏ hàng của bạn</h1>
        <p className='text-gray-600'>Có {cartItems.length} sản phẩm trong giỏ hàng</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-4'>
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className='p-6'>
                <div className='flex gap-4'>
                  <div className='w-20 h-20 rounded-lg overflow-hidden shrink-0'>
                    <ImageWithFallback src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>

                  <div className='flex-1 space-y-2'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='font-semibold'>{item.name}</h3>
                        <p className='text-sm text-gray-600'>{item.category}</p>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => onRemoveItem(item.id)}
                        className='text-red-500 hover:text-red-700 hover:bg-red-50'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='text-lg font-semibold text-green-600'>
                        {formatPrice(item.price)}
                        <span className='text-sm text-gray-500 font-normal'>/{item.unit}</span>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className='h-8 w-8 p-0'
                        >
                          <Minus className='h-4 w-4' />
                        </Button>

                        <Input
                          type='number'
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1
                            onUpdateQuantity(item.id, Math.max(1, value))
                          }}
                          className='w-16 text-center'
                          min='1'
                        />

                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className='h-8 w-8 p-0'
                        >
                          <Plus className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    <div className='text-right'>
                      <span className='font-semibold'>Thành tiền: {formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className='flex justify-between items-center pt-4'>
            <Button variant='outline' onClick={() => onNavigate('products')}>
              <ShoppingBag className='h-4 w-4 mr-2' />
              Tiếp tục mua sắm
            </Button>

            <Button
              variant='outline'
              onClick={() => {
                cartItems.forEach((item) => onRemoveItem(item.id))
              }}
              className='text-red-500 hover:text-red-700 hover:bg-red-50'
            >
              <Trash2 className='h-4 w-4 mr-2' />
              Xóa tất cả
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-24'>
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>

                {subtotal < 200000 && (
                  <div className='text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg'>
                    💡 Mua thêm {formatPrice(200000 - subtotal)} để được miễn phí vận chuyển
                  </div>
                )}
              </div>

              <Separator />

              <div className='flex justify-between text-lg font-semibold'>
                <span>Tổng cộng</span>
                <span className='text-green-600'>{formatPrice(total)}</span>
              </div>

              <Button className='w-full' size='lg' onClick={() => onNavigate('checkout')}>
                Tiến hành thanh toán
              </Button>

              <div className='space-y-2 text-xs text-gray-600'>
                <div className='flex items-center gap-2'>
                  <span>✅</span>
                  <span>Giao hàng trong 2-4 tiếng</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>✅</span>
                  <span>Đổi trả miễn phí trong 24h</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>✅</span>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
