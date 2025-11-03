import { Clock, RefreshCw, Shield, Star, Truck } from 'lucide-react'
import React from 'react'
import type { HomePageProps } from '~/types/homePage'
import { Badge } from '~/ui/badge'
import { Button } from '~/ui/button'
import { Card, CardContent } from '~/ui/card'

import { ProductCard } from './ProductCard'
import { ImageWithFallback } from '~/ui/ImageWithFallback'

export const HomePage = ({ products, onAddToCart, onViewProduct, onNavigate }: HomePageProps) => {
  const categories = [
    {
      name: 'Sầu riêng',
      image:
        'https://images.unsplash.com/photo-1630510526315-aba311212355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRyb3BpY2FsJTIwZnJ1aXRzJTIwZHVyaWFufGVufDF8fHx8MTc1OTE2NTg4OXww&ixlib=rb-4.1.0&q=80&w=400',
      count: 12
    },
    {
      name: 'Xoài',
      image:
        'https://images.unsplash.com/photo-1734163075572-8948e799e42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzU5MTM4MDcwfDA&ixlib=rb-4.1.0&q=80&w=400',
      count: 8
    },
    {
      name: 'Thanh long',
      image:
        'https://images.unsplash.com/photo-1693653897084-7b9d9fb9bfd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBmcnVpdCUyMHJlZHxlbnwxfHx8fDE3NTkxNjU4OTR8MA&ixlib=rb-4.1.0&q=80&w=400',
      count: 6
    },
    {
      name: 'Vú sữa',
      image:
        'https://images.unsplash.com/photo-1627521742129-bf9cda19b21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0YXJkJTIwYXBwbGUlMjBmcnVpdHxlbnwxfHx8fDE3NTkxNjU4OTd8MA&ixlib=rb-4.1.0&q=80&w=400',
      count: 10
    }
  ]

  const benefits = [
    {
      icon: <Truck className='h-6 w-6' />,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng trong 2-4 tiếng tại TP.HCM'
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: 'Chất lượng đảm bảo',
      description: 'Trái cây tươi ngon, nguồn gốc rõ ràng'
    },
    {
      icon: <RefreshCw className='h-6 w-6' />,
      title: 'Đổi trả dễ dàng',
      description: 'Đổi trả miễn phí trong 24h'
    },
    {
      icon: <Clock className='h-6 w-6' />,
      title: 'Hỗ trợ 24/7',
      description: 'Tư vấn và hỗ trợ mọi lúc'
    }
  ]

  const reviews = [
    {
      name: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Trái cây rất tươi ngon, giao hàng nhanh. Tôi sẽ mua lại!',
      avatar: '👨'
    },
    {
      name: 'Trần Thị B',
      rating: 5,
      comment: 'Sầu riêng ngon lắm, đúng như mô tả. Đóng gói cẩn thận.',
      avatar: '👩'
    },
    {
      name: 'Lê Minh C',
      rating: 4,
      comment: 'Xoài ngọt, thơm. Giá cả hợp lý so với chất lượng.',
      avatar: '👨'
    }
  ]

  const featuredProducts = products.slice(0, 8)

  return (
    <div className='space-y-12'>
      {/* Hero banner */}
      <section className='relative bg-linear-to-r from-green-50 to-blue-50 rounded-2xl overflow-hidden'>
        <div className='container mx-auto px-4 py-16 lg:py-24'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            <div className='space-y-6'>
              <Badge className='bg-green-100 text-green-800 border-green-200'>🍎 Trái cây tươi ngon mỗi ngày</Badge>
              <h1 className='text-4xl lg:text-6xl font-bold text-gray-900'>
                Trái cây tươi ngon
                <span className='text-green-600'> giao tận nhà</span>
              </h1>
              <p className='text-lg text-gray-600 max-w-md'>
                Thưởng thức trái cây tươi ngon từ các vùng trồng uy tín. Giao hàng nhanh chóng, đảm bảo chất lượng tốt
                nhất.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button size='lg' className='bg-green-600 hover:bg-green-700' onClick={() => onNavigate('products')}>
                  Mua ngay
                </Button>
                <Button size='lg' variant='outline'>
                  Xem danh mục
                </Button>
              </div>
              <div className='flex items-center gap-6 text-sm text-gray-600'>
                <div className='flex items-center gap-1'>
                  <span className='font-semibold text-green-600'>2000+</span>
                  Khách hàng tin tưởng
                </div>
                <div className='flex items-center gap-1'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  <span className='font-semibold'>4.8/5</span>
                  Đánh giá
                </div>
              </div>
            </div>
            <div className='relative'>
              <ImageWithFallback
                src='https://images.unsplash.com/photo-1623123093799-70a72826e167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc1OTE2NTkwMHww&ixlib=rb-4.1.0&q=80&w=1080'
                alt='Fresh fruits delivery'
                className='w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-2xl'
              />
              <div className='absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border'>
                <div className='text-sm text-gray-600'>Giao hàng trong</div>
                <div className='text-xl font-bold text-green-600'>2-4 giờ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục trái cây */}
      <section className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl font-bold'>Danh mục trái cây</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Khám phá các loại trái cây tươi ngon từ khắp mọi miền đất nước
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {categories.map((category, index) => (
            <Card key={index} className='group hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
              <CardContent className='p-6 text-center'>
                <div className='aspect-square rounded-full overflow-hidden mb-4 mx-auto w-20 h-20'>
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-200'
                  />
                </div>
                <h3 className='font-semibold mb-1'>{category.name}</h3>
                <p className='text-sm text-gray-600'>{category.count} sản phẩm</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h2 className='text-3xl font-bold'>Sản phẩm nổi bật</h2>
            <p className='text-gray-600 mt-2'>Những sản phẩm được yêu thích nhất</p>
          </div>
          <Button variant='outline' onClick={() => onNavigate('products')}>
            Xem tất cả
          </Button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetails={onViewProduct} />
          ))}
        </div>
      </section>

      {/* Tại sao nên chọn chúng tôi */}
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center space-y-4 mb-12'>
            <h2 className='text-3xl font-bold'>Tại sao chọn JuicyGo?</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tốt nhất
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {benefits.map((benefit, index) => (
              <Card key={index} className='bg-white text-center p-6 hover:shadow-lg transition-shadow duration-200'>
                <CardContent className='p-0'>
                  <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600'>
                    {benefit.icon}
                  </div>
                  <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                  <p className='text-sm text-gray-600'>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Khách hàng nói gì về chúng tôi */}
      <section className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl font-bold'>Khách hàng nói gì về chúng tôi</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Những phản hồi chân thực từ khách hàng đã trải nghiệm dịch vụ
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {reviews.map((review, index) => (
            <Card key={index} className='p-6'>
              <CardContent className='p-0'>
                <div className='flex items-center mb-4'>
                  <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4'>
                    <span className='text-2xl'>{review.avatar}</span>
                  </div>
                  <div>
                    <h4 className='font-semibold'>{review.name}</h4>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className='text-gray-600 italic'>"{review.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
