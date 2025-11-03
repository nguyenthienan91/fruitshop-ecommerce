import { Plus, Star } from 'lucide-react'
import React from 'react'
import type { ProductCardProps } from '~/types/productCard'
import { Badge } from '~/ui/badge'
import { Button } from '~/ui/button'
import { Card, CardContent, CardFooter } from '~/ui/card'
import { ImageWithFallback } from '~/ui/ImageWithFallback'

export const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }
  return (
    <Card className='group hover:shadow-lg transition-shadow duration-200 overflow-hidden'>
      <div className='relative'>
        <div className='aspect-square overflow-hidden'>
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer'
            onClick={() => onViewDetails(product)}
          />
        </div>

        {/* Badges */}
        <div className='absolute top-2 left-2 flex flex-col gap-1'>
          {product.isNew && <Badge className='bg-green-500 text-white'>Mới</Badge>}
          {product.discount && <Badge className='bg-red-500 text-white'>-{product.discount}%</Badge>}
        </div>

        {/* Quick add button */}
        <Button
          size='sm'
          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 rounded-full p-0'
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>

      <CardContent className='p-4'>
        <div className='space-y-2'>
          <h3
            className='font-medium line-clamp-2 cursor-pointer hover:text-green-600 transition-colors'
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>

          <div className='flex items-center gap-1'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className='text-xs text-muted-foreground'>({product.reviewCount})</span>
          </div>

          <div className='flex items-center gap-2'>
            <span className='font-semibold text-green-600'>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className='text-sm text-muted-foreground line-through'>{formatPrice(product.originalPrice)}</span>
            )}
            <span className='text-sm text-muted-foreground'>/{product.unit}</span>
          </div>

          {!product.inStock && <div className='text-sm text-red-500'>Hết hàng</div>}
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <div className='flex gap-2 w-full'>
          <Button variant='outline' size='sm' className='flex-1' onClick={() => onViewDetails(product)}>
            Xem chi tiết
          </Button>
          <Button size='sm' className='flex-1' onClick={() => onAddToCart(product)} disabled={!product.inStock}>
            Thêm vào giỏ
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
