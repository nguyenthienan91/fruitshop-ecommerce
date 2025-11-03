import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import React from 'react'
import { Button } from '~/ui/button'
import { Input } from '~/ui/input'

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white mt-12'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                <span className='text-white font-bold'>🍎</span>
              </div>
              <div>
                <h3 className='font-bold text-green-400'>JuicyGo</h3>
                <p className='text-xs text-gray-400'>Trái cây tươi ngon</p>
              </div>
            </div>
            <p className='text-gray-300 text-sm'>
              Chuyên cung cấp trái cây tươi ngon, chất lượng cao từ các vùng trồng uy tín. Cam kết giao hàng nhanh, giữ
              nguyên độ tươi ngon.
            </p>
            <div className='flex gap-3'>
              <Button size='sm' variant='ghost' className='text-gray-400 hover:text-blue-400 p-2'>
                <Facebook className='h-5 w-5' />
              </Button>
              <Button size='sm' variant='ghost' className='text-gray-400 hover:text-pink-400 p-2'>
                <Instagram className='h-5 w-5' />
              </Button>
              <Button size='sm' variant='ghost' className='text-gray-400 hover:text-red-400 p-2'>
                <Youtube className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='font-semibold'>Liên kết nhanh</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Trang chủ
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Liên hệ
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className='space-y-4'>
            <h4 className='font-semibold'>Chính sách</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-300 hover:text-green-400 transition-colors'>
                  Hướng dẫn thanh toán
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className='space-y-4'>
            <h4 className='font-semibold'>Liên hệ</h4>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-green-400' />
                <span className='text-gray-300'>1900-1234</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-green-400' />
                <span className='text-gray-300'>contact@juicygo.vn</span>
              </div>
              <div className='flex items-start gap-2'>
                <MapPin className='h-4 w-4 text-green-400 mt-0.5' />
                <span className='text-gray-300'>54 Đường 12D, Quận 9, TP.HCM</span>
              </div>
            </div>

            <div className='space-y-2'>
              <h5 className='font-medium'>Đăng ký nhận tin</h5>
              <div className='flex gap-2'>
                <Input
                  type='email'
                  placeholder='Email của bạn'
                  className='bg-gray-800 border-gray-700 text-white placeholder:text-gray-400'
                />
                <Button size='sm' className='bg-green-600 hover:bg-green-700'>
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-400'>
            <p>&copy; 2024 JuicyGo. Tất cả quyền được bảo lưu.</p>
            <div className='flex gap-4 mt-4 md:mt-0'>
              <span>Giờ làm việc: 8:00 - 21:00 (Thứ 2 - Thứ 7)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
