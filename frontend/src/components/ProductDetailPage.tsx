import { ArrowLeft, Heart, Minus, Plus, RefreshCw, Share2, Shield, ShoppingCart, Star, Truck } from 'lucide-react'
import React, { useState } from 'react'
import type { ProductDetailPageProps } from '~/types/productDetailPage'
import { Badge } from '~/ui/badge'
import { Button } from '~/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/ui/card'
import { ImageWithFallback } from '~/ui/ImageWithFallback'
import { Input } from '~/ui/input'
import { Separator } from '~/ui/separator'
import { Textarea } from '~/ui/textarea'

export const ProductDetailPage = ({ product, onAddToCart, onNavigate }: ProductDetailPageProps) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })

  // Mock additional images
  const productImages = [product.image, product.image, product.image]

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Sản phẩm rất tươi ngon, giao hàng nhanh. Tôi sẽ mua lại!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      user: 'Trần Thị B',
      rating: 4,
      comment: 'Chất lượng tốt, đóng gói cẩn thận. Giá hơi cao một chút.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      user: 'Lê Minh C',
      rating: 5,
      comment: 'Ngon tuyệt vời! Sẽ giới thiệu cho bạn bè.',
      date: '2024-01-08',
      verified: false
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New review:', newReview)
    alert('Đánh giá của bạn đã được gửi!')
    setNewReview({ rating: 5, comment: '' })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 mb-6 text-sm'>
        <Button variant='ghost' size='sm' onClick={() => onNavigate('')} className='p-0 h-auto'>
          Trang chủ
        </Button>
        <span className='text-gray-400'>/</span>
        <Button variant='ghost' size='sm' onClick={() => onNavigate('products')} className='p-0 h-auto'>
          Sản phẩm
        </Button>
        <span className='text-gray-400'>/</span>
        <span className='text-gray-600'>{product.name}</span>
      </div>

      <Button variant='ghost' onClick={() => onNavigate('products')} className='mb-6'>
        <ArrowLeft className='h-4 w-4 mr-2' />
        Quay lại danh sách sản phẩm
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12'>
        {/* Hình ảnh sản phẩm */}
        <div className='space-y-4'>
          <div className='aspect-square rounded-lg overflow-hidden bg-gray-100'>
            <ImageWithFallback
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? 'border-green-500' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Badge variant='secondary'>{product.category}</Badge>
              {product.isNew && <Badge className='bg-green-500'>Mới</Badge>}
              {product.discount && <Badge className='bg-red-500'>-{product.discount}%</Badge>}
            </div>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>

            <div className='flex items-center gap-4 mb-4'>
              <div className='flex items-center'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className='text-gray-600'>
                {product.rating} ({product.reviewCount} đánh giá)
              </span>
            </div>

            <div className='flex items-center gap-4 mb-6'>
              <span className='text-3xl font-bold text-green-600'>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className='text-xl text-gray-500 line-through'>{formatPrice(product.originalPrice)}</span>
              )}
              <span className='text-gray-600'>/{product.unit}</span>
            </div>

            <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? '✅ Còn hàng' : '❌ Hết hàng'}
            </div>
          </div>

          {/* Số lượng và thêm vào giỏ hàng */}
          {product.inStock && (
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='font-medium'>Số lượng:</span>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='h-10 w-10 p-0'
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <Input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className='w-20 text-center'
                    min='1'
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setQuantity(quantity + 1)}
                    className='h-10 w-10 p-0'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <div className='flex gap-4'>
                <Button onClick={handleAddToCart} className='flex-1' size='lg'>
                  <ShoppingCart className='h-5 w-5 mr-2' />
                  Thêm vào giỏ - {formatPrice(product.price * quantity)}
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant='outline' size='lg'>
                  <Share2 className='h-5 w-5' />
                </Button>
              </div>
            </div>
          )}

          {/* Lợi ích */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-2 text-sm'>
              <Truck className='h-4 w-4 text-green-600' />
              <span>Giao nhanh 2-4h</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Shield className='h-4 w-4 text-green-600' />
              <span>Chất lượng đảm bảo</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <RefreshCw className='h-4 w-4 text-green-600' />
              <span>Đổi trả 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Mô tả sản phẩm */}
        <div className='lg:col-span-2 space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Mô tả sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='prose max-w-none'>
                <p>
                  {product.name} là một trong những loại trái cây được yêu thích nhất với hương vị thơm ngon đặc trưng.
                  Sản phẩm được chúng tôi tuyển chọn kỹ lưỡng từ những vùng trồng uy tín, đảm bảo chất lượng tốt nhất
                  khi đến tay khách hàng.
                </p>
                <h4>Đặc điểm nổi bật:</h4>
                <ul>
                  <li>Tươi ngon, chín tự nhiên</li>
                  <li>Nguồn gốc rõ ràng, an toàn</li>
                  <li>Đóng gói cẩn thận, bảo quản đúng cách</li>
                  <li>Giao hàng nhanh chóng trong ngày</li>
                </ul>
                <h4>Hướng dẫn bảo quản:</h4>
                <ul>
                  <li>Bảo quản ở nơi khô ráo, thoáng mát</li>
                  <li>Tránh ánh nắng trực tiếp</li>
                  <li>Sử dụng trong vòng 2-3 ngày để đảm bảo độ tươi ngon</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Phần đánh giá */}
          <Card>
            <CardHeader>
              <CardTitle>Đánh giá sản phẩm ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Danh sách review */}
              <div className='space-y-4'>
                {reviews.map((review) => (
                  <div key={review.id} className='border-b border-gray-100 pb-4 last:border-b-0'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>{review.user}</span>
                        {review.verified && (
                          <Badge variant='secondary' className='text-xs'>
                            ✅ Đã mua hàng
                          </Badge>
                        )}
                      </div>
                      <span className='text-sm text-gray-500'>{review.date}</span>
                    </div>
                    <div className='flex items-center mb-2'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-gray-700'>{review.comment}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Thêm form đánh giá */}
              <div>
                <h4 className='font-medium mb-4'>Viết đánh giá của bạn</h4>
                <form onSubmit={handleSubmitReview} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Đánh giá</label>
                    <div className='flex gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type='button'
                          onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                          className='p-1'
                        >
                          <Star
                            className={`h-6 w-6 ${
                              i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Nhận xét</label>
                    <Textarea
                      placeholder='Chia sẻ trải nghiệm của bạn về sản phẩm...'
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      required
                    />
                  </div>
                  <Button type='submit'>Gửi đánh giá</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Những sản phẩm liên quan */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm liên quan</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Mock related products */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className='flex gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer'>
                  <div className='w-16 h-16 bg-gray-100 rounded-lg overflow-hidden'>
                    <ImageWithFallback
                      src={product.image}
                      alt='Related product'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-medium text-sm'>Trái cây tương tự {index + 1}</h4>
                    <p className='text-green-600 font-semibold'>{formatPrice(product.price - 10000)}</p>
                    <div className='flex items-center'>
                      <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                      <span className='text-xs text-gray-600 ml-1'>4.8</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
