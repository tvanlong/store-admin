import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '~/apis/categories.api'
import { getAllSubcategories } from '~/apis/subcategories.api'
import { getAllVersions } from '~/apis/version.api'
import { getAllCustomers } from '~/apis/users.api'
import { getAllOrders } from '~/apis/orders.api'
import Card from './Card'

function Cards() {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  })

  const { data: subcategoriesData } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  })

  const { data: versionsData } = useQuery({
    queryKey: ['versions'],
    queryFn: getAllVersions
  })

  const { data: customersData } = useQuery({
    queryKey: ['customers'],
    queryFn: getAllCustomers
  })

  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  })

  const categories = useMemo(() => categoriesData?.data.data, [categoriesData])
  const subcategories = useMemo(() => subcategoriesData?.data.data, [subcategoriesData])
  const versions = useMemo(() => versionsData?.data.data.docs, [versionsData])
  const customers = useMemo(() => customersData?.data.data, [customersData])
  const orders = useMemo(() => ordersData?.data.data, [ordersData])

  return (
    <div className='flex justify-center gap-5 my-20'>
      <Card
        color='#337ab7'
        icon={
          <svg
            className='w-16 h-16'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
          </svg>
        }
        title='Danh mục lớn'
        animatedValue={categories?.length || 0}
        label='categories'
      />
      <Card
        color='#00bae8'
        icon={
          <svg
            className='w-16 h-16'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
          </svg>
        }
        title='Danh mục nhỏ'
        animatedValue={subcategories?.length || 0}
        label='subcategories'
      />
      <Card
        color='#5cb85c'
        icon={
          <svg
            className='w-16 h-16'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              fillRule='evenodd'
              d='M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z'
              clipRule='evenodd'
            />
          </svg>
        }
        title='Tổng sản phẩm'
        animatedValue={versions?.length || 0}
        label='products'
      />
      <Card
        color='#f0ad4e'
        icon={
          <svg
            className='w-16 h-16'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 4a3 3 0 0 0-3 2v.2c0 .1-.1.2 0 .2v.2c.3.2.6.4.9.4h6c.3 0 .6-.2.8-.4l.2-.2v-.2l-.1-.1A3 3 0 0 0 10 14H7.9Z'
              clipRule='evenodd'
            />
          </svg>
        }
        title='Tổng khách hàng'
        animatedValue={customers?.length || 0}
        label='customers'
      />
      <Card
        color='#d9534f'
        icon={
          <svg
            className='w-16 h-16'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M12 6.2 7 9.4l5 3.2-5 3.2-5-3.3 5-3.1-5-3.2L7 3l5 3.2ZM7 17.8l5-3.2 5 3.2-5 3.2-5-3.2Z' />
            <path d='m12 12.5 5-3.1-5-3.2L17 3l5 3.2-5 3.2 5 3.2-5 3.2-5-3.3Z' />
          </svg>
        }
        title='Tổng đơn hàng'
        animatedValue={orders?.length || 0}
        label='orders'
      />
    </div>
  )
}

export default Cards
