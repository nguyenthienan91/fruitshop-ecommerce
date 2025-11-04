import { Filter, Grid, List, Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import type { ProductsPageProps } from '~/types/productPage'
import { Button } from '~/ui/button'
import { Card, CardContent } from '~/ui/card'
import { Input } from '~/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/ui/select'
import { ProductCard } from './ProductCard'
import { Badge } from '~/ui/badge'

export const ProductsPage = ({ products, onAddToCart, onViewProduct }: ProductsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return cats
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

      let matchesPrice = true
      if (priceRange !== 'all') {
        const price = product.price
        switch (priceRange) {
          case 'under-50k':
            matchesPrice = price < 50000
            break
          case '50k-100k':
            matchesPrice = price >= 50000 && price < 100000
            break
          case '100k-200k':
            matchesPrice = price >= 100000 && price < 200000
            break
          case 'over-200k':
            matchesPrice = price >= 200000
            break
        }
      }

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Sản phẩm</h1>
        <p className='text-gray-600'>Khám phá bộ sưu tập trái cây tươi ngon của chúng tôi</p>
      </div>

      {/* Search and Controls */}
      <div className='mb-8 space-y-4'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              type='text'
              placeholder='Tìm kiếm sản phẩm...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <Button variant='outline' onClick={() => setShowFilters(!showFilters)} className='lg:hidden'>
            <Filter className='h-4 w-4 mr-2' />
            Bộ lọc
          </Button>

          {/* View Mode */}
          <div className='hidden lg:flex border rounded-lg'>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size='sm'
              onClick={() => setViewMode('grid')}
              className='rounded-r-none'
            >
              <Grid className='h-4 w-4' />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size='sm'
              onClick={() => setViewMode('list')}
              className='rounded-l-none'
            >
              <List className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder='Chọn danh mục' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả danh mục</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder='Khoảng giá' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả giá</SelectItem>
              <SelectItem value='under-50k'>Dưới 50.000đ</SelectItem>
              <SelectItem value='50k-100k'>50.000đ - 100.000đ</SelectItem>
              <SelectItem value='100k-200k'>100.000đ - 200.000đ</SelectItem>
              <SelectItem value='over-200k'>Trên 200.000đ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder='Sắp xếp theo' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Tên A-Z</SelectItem>
              <SelectItem value='price-asc'>Giá thấp đến cao</SelectItem>
              <SelectItem value='price-desc'>Giá cao đến thấp</SelectItem>
              <SelectItem value='rating'>Đánh giá cao nhất</SelectItem>
              <SelectItem value='newest'>Mới nhất</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-600'>{filteredProducts.length} sản phẩm</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setPriceRange('all')
                setSortBy('name')
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <Card className='p-12 text-center'>
          <CardContent className='p-0'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold mb-2'>Không tìm thấy sản phẩm</h3>
            <p className='text-gray-600 mb-4'>Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn</p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setPriceRange('all')
              }}
            >
              Xóa bộ lọc
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'
          }
        >
          {filteredProducts.map((product) =>
            viewMode === 'grid' ? (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onViewDetails={onViewProduct} />
            ) : (
              <Card key={product.id} className='p-4'>
                <CardContent className='p-0'>
                  <div className='flex gap-4'>
                    <div className='w-24 h-24 rounded-lg overflow-hidden flex-shrink-0'>
                      <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-start justify-between'>
                        <h3 className='font-semibold'>{product.name}</h3>
                        <div className='text-right'>
                          <div className='font-semibold text-green-600'>{formatPrice(product.price)}</div>
                          <div className='text-sm text-gray-500'>/{product.unit}</div>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Badge variant='secondary'>{product.category}</Badge>
                        {product.isNew && <Badge className='bg-green-500'>Mới</Badge>}
                        {!product.inStock && <Badge variant='destructive'>Hết hàng</Badge>}
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-gray-600'>
                          ⭐ {product.rating} ({product.reviewCount} đánh giá)
                        </div>
                        <div className='flex gap-2'>
                          <Button size='sm' variant='outline' onClick={() => onViewProduct(product)}>
                            Xem
                          </Button>
                          <Button size='sm' onClick={() => onAddToCart(product)} disabled={!product.inStock}>
                            Thêm vào giỏ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  )
}
