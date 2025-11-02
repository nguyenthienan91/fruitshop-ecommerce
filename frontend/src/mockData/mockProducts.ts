import type { Product } from '~/types/product'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sầu riêng Monthong Thái Lan',
    price: 180000,
    originalPrice: 220000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1630510526315-aba311212355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRyb3BpY2FsJTIwZnJ1aXRzJTIwZHVyaWFufGVufDF8fHx8MTc1OTE2NTg4OXww&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    category: 'Sầu riêng',
    isNew: true,
    discount: 18
  },
  {
    id: '2',
    name: 'Xoài cát Hòa Lộc',
    price: 85000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1734163075572-8948e799e42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzU5MTM4MDcwfDA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    category: 'Xoài'
  },
  {
    id: '3',
    name: 'Thanh long ruột đỏ',
    price: 45000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1693653897084-7b9d9fb9bfd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBmcnVpdCUyMHJlZHxlbnwxfHx8fDE3NTkxNjU4OTR8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.7,
    reviewCount: 65,
    inStock: true,
    category: 'Thanh long',
    isNew: true
  },
  {
    id: '4',
    name: 'Na Thái Lan',
    price: 120000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1627521742129-bf9cda19b21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0YXJkJTIwYXBwbGUlMjBmcnVpdHxlbnwxfHx8fDE3NTkxNjU4OTd8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.6,
    reviewCount: 43,
    inStock: true,
    category: 'Vú sữa'
  },
  {
    id: '5',
    name: 'Sầu riêng Ri6 Đắk Lắk',
    price: 250000,
    originalPrice: 280000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1630510526315-aba311212355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRyb3BpY2FsJTIwZnJ1aXRzJTIwZHVyaWFufGVufDF8fHx8MTc1OTE2NTg4OXww&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    category: 'Sầu riêng',
    discount: 11
  },
  {
    id: '6',
    name: 'Xoài Thái xanh',
    price: 75000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1734163075572-8948e799e42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzU5MTM4MDcwfDA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.5,
    reviewCount: 78,
    inStock: false,
    category: 'Xoài'
  },
  {
    id: '7',
    name: 'Thanh long trắng',
    price: 35000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1693653897084-7b9d9fb9bfd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFnb24lMjBmcnVpdCUyMHJlZHxlbnwxfHx8fDE3NTkxNjU4OTR8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.4,
    reviewCount: 92,
    inStock: true,
    category: 'Thanh long'
  },
  {
    id: '8',
    name: 'Na Dai Đài Loan',
    price: 150000,
    unit: 'kg',
    image:
      'https://images.unsplash.com/photo-1627521742129-bf9cda19b21f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0YXJkJTIwYXBwbGUlMjBmcnVpdHxlbnwxfHx8fDE3NTkxNjU4OTd8MA&ixlib=rb-4.1.0&q=80&w=400',
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    category: 'Vú sữa',
    isNew: true
  }
]