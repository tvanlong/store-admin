import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    month: 'Tháng 1',
    revenue: 50000000
  },
  {
    month: 'Tháng 2',
    revenue: 300000000
  },
  {
    month: 'Tháng 3',
    revenue: 280000000
  },
  {
    month: 'Tháng 4',
    revenue: 278000000
  },
  {
    month: 'Tháng 5',
    revenue: 189000000
  },
  {
    month: 'Tháng 6',
    revenue: 239000000
  },
  {
    month: 'Tháng 7',
    revenue: 349000000
  },
  {
    month: 'Tháng 8'
  }
]

function DashboardChart() {
  return (
    <div className='border border-gray-200 overflow-hidden rounded-lg mx-10'>
      <div className='flex items-center p-3 gap-3 bg-gray-200'>
        <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
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
      <div className='p-4 flex justify-center'>
        <AreaChart width={850} height={300} data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
