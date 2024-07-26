export const productSortOptions = [
  { param: 'createdAt', value: 'new', label: 'Mới nhất' },
  { param: 'createdAt', value: 'old', label: 'Cũ nhất' }
]

export const sortOptions = [
  { param: 'createdAt', value: 'new', label: 'Mới nhất' },
  { param: 'createdAt', value: 'old', label: 'Cũ nhất' },
  { param: 'price', value: 'asc', label: 'Giá thấp - cao' },
  { param: 'price', value: 'desc', label: 'Giá cao - thấp' }
]

export const statusOptions = ['Chờ xác nhận', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy']

export const priceOptions = [
  { param: ['price_min', 'price_max'], label: 'Dưới 10 triệu', value: [undefined, 10000000] },
  {
    param: ['price_min', 'price_max'],
    label: '10 triệu - 20 triệu',
    value: [10000000, 20000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '20 triệu - 40 triệu',
    value: [20000000, 40000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '40 triệu - 60 triệu',
    value: [40000000, 60000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '60 triệu - 80 triệu',
    value: [60000000, 80000000]
  },
  { param: 'price_min', label: 'Trên 80 triệu', value: 80000000 }
]
