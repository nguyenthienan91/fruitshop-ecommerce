import React from 'react'
import type { HeaderProps } from '../types/header'
import { Input } from '~/ui/input'
import { Button } from '~/ui/button'
import { Badge } from '~/ui/badge'
import { Menu, Search, ShoppingCart, User } from 'lucide-react'


export const Header = ({ cartCount, currentPage, onNavigate, onToggleMobileMenu }: HeaderProps) => {
  return (
    <header className='bg-white border-b border-border sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        {/* Top bar */}
        <div className='flex items-center justify-between py-2 border-b border-gray-100'>
          <div className='text-sm text-muted-foreground'>📞 Hotline: 1900-1234 | Giao hàng miễn phí đơn từ 200k</div>
          <div className='hidden md:flex items-center gap-4 text-sm'>
            <span>Chăm sóc khách hàng</span>
            <span>|</span>
            <span>Chính sách đổi trả</span>
          </div>
        </div>

        {/* Main header */}
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => onNavigate('')}>
            <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center'>
              <span className='text-white font-bold'>🍎</span>
            </div>
            <div>
              <h1 className='text-xl font-bold text-green-600'>JuicyGo</h1>
              <p className='text-xs text-muted-foreground'>Trái cây tươi ngon</p>
            </div>
          </div>

          {/* Search bar - Desktop */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Input type='text' placeholder='Tìm kiếm trái cây...' className='pr-10' />
              <Button size='sm' className='absolute right-1 top-1 h-8 w-8' variant='ghost'>
                <Search className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Right actions */}
          <div className='flex items-center gap-2'>
            {/* Desktop navigation */}
            <div className='hidden md:flex items-center gap-4'>
              <Button
                variant='ghost'
                onClick={() => onNavigate('products')}
                className={currentPage === 'products' ? 'bg-accent' : ''}
              >
                Sản phẩm
              </Button>
              <Button variant='ghost' onClick={() => onNavigate('about')}>
                Về chúng tôi
              </Button>
              <Button variant='ghost' onClick={() => onNavigate('contact')}>
                Liên hệ
              </Button>
            </div>

            {/* User menu */}
            <Button variant='ghost' size='sm' onClick={() => onNavigate('auth')} className='hidden md:flex'>
              <User className='h-4 w-4 mr-1' />
              Tài khoản
            </Button>

            {/* Cart */}
            <Button variant='ghost' size='sm' className='relative' onClick={() => onNavigate('cart')}>
              <ShoppingCart className='h-5 w-5' />
              {cartCount > 0 && (
                <Badge className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'>
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button variant='ghost' size='sm' className='md:hidden' onClick={onToggleMobileMenu}>
              <Menu className='h-5 w-5' />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className='md:hidden pb-4'>
          <div className='relative'>
            <Input type='text' placeholder='Tìm kiếm trái cây...' className='pr-10' />
            <Button size='sm' className='absolute right-1 top-1 h-8 w-8' variant='ghost'>
              <Search className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
