import { useMemo } from 'react'
import { useOrders } from '~/hooks/useOrders'
import { formatCurrency } from '~/utils/format'

function CustomerTable() {
  const { data: ordersData } = useOrders()
  const orders = useMemo(() => ordersData?.data.data, [ordersData])

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white col-span-4'>
      <div className='flex items-center gap-3 bg-gray-200 p-3'>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
        <h2 className='text-sm font-bold'>Khách hàng đặt hàng gần đây</h2>
      </div>
      <div className='p-6'>
        <div className='mb-6 space-y-4'>
          {orders?.slice(0, 5).map((order) => (
            <div key={order._id} className='flex items-center gap-5 py-3 px-7.5'>
              <div className='relative'>
                <img
                  className='h-14 w-14 border border-gray-200 rounded-full object-cover'
                  src={order.user.avatar}
                  alt={order.user.name}
                />
                <span
                  className='absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white'
                  style={{ backgroundColor: 'rgb(16, 185, 129)' }}
                ></span>
              </div>
              <div className='flex flex-1 items-center justify-between'>
                <div>
                  <h5 className='text-sm font-medium text-black'>{order.user.name}</h5>
                  <p>
                    <span className='text-xs text-black'>{order.user.email}</span>
                  </p>
                </div>
                <div>
                  <span className='text-xs font-medium'>{formatCurrency(order.total_price)} đ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerTable
