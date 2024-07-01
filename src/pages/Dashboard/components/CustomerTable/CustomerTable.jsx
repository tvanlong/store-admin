import { useMemo } from 'react'
import { useOrders } from '~/hooks/useOrders'
import { formatCurrency } from '~/utils/format'

function CustomerTable() {
  const { data: ordersData } = useOrders()
  const orders = useMemo(() => ordersData?.data.data, [ordersData])

  return (
    <div className='overflow-hidden rounded-lg border border-gray-100 bg-white col-span-4'>
      <div className='flex items-center gap-3 bg-gray-200 p-3'>
        <svg className='h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2'
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
