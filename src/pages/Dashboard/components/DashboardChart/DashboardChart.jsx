import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { useOrders } from '~/hooks/useOrders'

function DashboardChart() {
  const [revenueData, setRevenueData] = useState([])
  const { data: ordersData } = useOrders()

  useEffect(() => {
    const initialData = Array.from({ length: 12 }, (_, index) => ({
      month: `T${index + 1}`,
      revenue: 0
    }))

    const orders = ordersData?.data?.data || []

    const revenueByMonth = {}
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt)
      const month = orderDate.getMonth() + 1
      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0
      }
      revenueByMonth[month] += order.total_price
    })

    const updatedData = initialData.map((monthData) => {
      const month = parseInt(monthData.month.split('T')[1])
      const revenue = revenueByMonth[month] || 0
      return { ...monthData, revenue }
    })

    setRevenueData(updatedData)
  }, [ordersData])

  return (
    <div className='mx-10 overflow-hidden rounded-lg border border-gray-200'>
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
        <h2 className='text-sm font-bold'>Area Chart</h2>
      </div>
      <div className='flex justify-center p-4'>
        <AreaChart width={850} height={300} data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis fontSize={12} dataKey='month' />
          <YAxis fontSize={12} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area type='monotone' dataKey='revenue' stroke='#8884d8' fillOpacity={1} fill='url(#colorRevenue)' />
        </AreaChart>
      </div>
    </div>
  )
}

export default DashboardChart
