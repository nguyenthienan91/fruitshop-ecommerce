import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react'
import React, { useState } from 'react'
import type { AuthPageProps, LoginFormData, RegisterFormData } from '~/types/auth'
import { Button } from '~/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/ui/card'
import { Input } from '~/ui/input'
import { Label } from '~/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/ui/tabs'
import { useForm } from 'react-hook-form'

export const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // React hook form cho đăng nhập
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm<LoginFormData>()

  // React hook form cho đăng ký
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch,
    formState: { errors: registerErrors }
  } = useForm<RegisterFormData>()

  const onLoginSubmit = (data: LoginFormData) => {
    console.log('Login:', data)
    alert('Đăng nhập thành công!')
  }

  const onRegisterSubmit = (data: RegisterFormData) => {
    // Mock register logic
    console.log('Register:', data)
    alert('Đăng ký thành công!')
  }

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-md mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Chào mừng bạn</h1>
          <p className='text-gray-600'>Đăng nhập hoặc tạo tài khoản để tiếp tục</p>
        </div>

        <Tabs defaultValue='login' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='login'>Đăng nhập</TabsTrigger>
            <TabsTrigger value='register'>Đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value='login'>
            <Card>
              <CardHeader>
                <CardTitle>Đăng nhập tài khoản</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit(onLoginSubmit)} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='login-email'>Email</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='login-email'
                        type='email'
                        placeholder='Nhập email của bạn'
                        className='pl-10'
                        {...loginRegister('email', {
                          required: 'Email là bắt buộc',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ'
                          }
                        })}
                      />
                    </div>
                    {loginErrors.email && <p className='text-sm text-red-500'>{loginErrors.email.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='login-password'>Mật khẩu</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='login-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Nhập mật khẩu'
                        className='pl-10 pr-10'
                        {...loginRegister('password', {
                          required: 'Mật khẩu là bắt buộc',
                          minLength: {
                            value: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự'
                          }
                        })}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                      </button>
                    </div>
                    {loginErrors.password && <p className='text-sm text-red-500'>{loginErrors.password.message}</p>}
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <input type='checkbox' id='remember' className='rounded' />
                      <Label htmlFor='remember' className='text-sm'>
                        Ghi nhớ đăng nhập
                      </Label>
                    </div>
                    <Button variant='link' className='p-0 h-auto text-sm'>
                      Quên mật khẩu?
                    </Button>
                  </div>

                  <Button type='submit' className='w-full'>
                    Đăng nhập
                  </Button>

                  <div className='text-center'>
                    <p className='text-sm text-gray-600'>Hoặc đăng nhập bằng</p>
                    <div className='flex gap-2 mt-2'>
                      <Button variant='outline' className='flex-1'>
                        <img
                          src='https://developers.google.com/identity/images/g-logo.png'
                          alt='Google'
                          className='w-4 h-4 mr-2'
                        />
                        Google
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='register'>
            <Card>
              <CardHeader>
                <CardTitle>Tạo tài khoản mới</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='register-name'>Họ và tên</Label>
                    <div className='relative'>
                      <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='register-name'
                        type='text'
                        placeholder='Nhập họ và tên'
                        className='pl-10'
                        {...registerRegister('name', {
                          required: 'Họ và tên là bắt buộc',
                          minLength: {
                            value: 2,
                            message: 'Họ và tên phải có ít nhất 2 ký tự'
                          }
                        })}
                      />
                    </div>
                    {registerErrors.name && <p className='text-sm text-red-500'>{registerErrors.name.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-email'>Email</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='register-email'
                        type='email'
                        placeholder='Nhập email của bạn'
                        className='pl-10'
                        {...registerRegister('email', {
                          required: 'Email là bắt buộc',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ'
                          }
                        })}
                      />
                    </div>
                    {registerErrors.email && <p className='text-sm text-red-500'>{registerErrors.email.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-phone'>Số điện thoại</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='register-phone'
                        type='tel'
                        placeholder='Nhập số điện thoại'
                        className='pl-10'
                        {...registerRegister('phone', {
                          required: 'Số điện thoại là bắt buộc',
                          pattern: {
                            value: /^[0-9]{10,11}$/,
                            message: 'Số điện thoại phải có 10-11 chữ số'
                          }
                        })}
                      />
                    </div>
                    {registerErrors.phone && <p className='text-sm text-red-500'>{registerErrors.phone.message}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-password'>Mật khẩu</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='register-password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Nhập mật khẩu'
                        className='pl-10 pr-10'
                        {...registerRegister('password', {
                          required: 'Mật khẩu là bắt buộc',
                          minLength: {
                            value: 6,
                            message: 'Mật khẩu phải có ít nhất 6 ký tự'
                          }
                        })}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                      </button>
                    </div>
                    {registerErrors.password && (
                      <p className='text-sm text-red-500'>{registerErrors.password.message}</p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='register-confirm-password'>Xác nhận mật khẩu</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                      <Input
                        id='register-confirm-password'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Nhập lại mật khẩu'
                        className='pl-10 pr-10'
                        {...registerRegister('confirmPassword', {
                          required: 'Xác nhận mật khẩu là bắt buộc',
                          validate: (value: any) => value === watch('password') || 'Mật khẩu xác nhận không khớp'
                        })}
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                      >
                        {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                      </button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className='text-sm text-red-500'>{registerErrors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button type='submit' className='w-full'>
                    Tạo tài khoản
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className='text-center mt-6'>
          <Button variant='ghost' onClick={() => onNavigate('home')}>
            ← Quay lại trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}
