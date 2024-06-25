import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import AreaChart from './components/AreaChart'

const dataLineChart = [
  {
    name: 'T1',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'T2',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'T3',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'T4',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'T5',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'T6',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'T7',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'T8',
    uv: 3390,
    pv: 4000,
    amt: 2100
  },
  {
    name: 'T9',
    uv: 2490,
    pv: 3400,
    amt: 2100
  },
  {
    name: 'T10',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'T11',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'T12',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

const dataStackedBarChart = [
  {
    name: 'T1',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'T2',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'T3',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'T4',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'T5',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'T6',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'T7',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'T8',
    uv: 3490,
    pv: 4200,
    amt: 2000
  },
  {
    name: 'T9',
    uv: 3290,
    pv: 4000,
    amt: 2500
  },
  {
    name: 'T10',
    uv: 3290,
    pv: 4600,
    amt: 2400
  },
  {
    name: 'T11',
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 'T12',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

const dataTwoSimplePieChart = [
  { name: 'Laptop Dell', value: 400 },
  { name: 'Laptop Asus', value: 300 },
  { name: 'Laptop Lenovo', value: 300 },
  { name: 'Laptop Acer', value: 200 },
  { name: 'Laptop MSI', value: 278 },
  { name: 'Macbook', value: 189 }
]

function PageAnalytics({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  return (
    <div className='mt-24'>
      <Helmet>
        <title>Trang thống kê | Thông tin tổng quan</title>
        <meta name='description' content='Trang thống kê | Thông tin tổng quan' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Thống kê tổng quan
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Thống kê tổng quan về doanh số, lượt truy cập, đơn hàng, ...
        </p>
      </div>
      <AreaChart />
      <div className='grid grid-cols-12 gap-8 m-10'>
        <div className='col-span-7 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3 bg-gray-200 p-3'>
            <svg
              className='h-4 w-4'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2'
              />
            </svg>
            <h2 className='text-sm font-bold'>Doanh thu so với số lượng đơn hàng</h2>
          </div>
          <div className='flex justify-center p-4'>
            <LineChart
              width={730}
              height={250}
              data={dataLineChart}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='pv' stroke='#8884d8' />
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
            </LineChart>
          </div>
        </div>
        <div className='col-span-5 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3 bg-gray-200 p-3'>
            <svg
              className='h-4 w-4'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2'
              />
            </svg>
            <h2 className='text-sm font-bold'>Lợi nhuận so với số lượng đơn hàng</h2>
          </div>
          <div className='flex justify-center p-4'>
            <BarChart
              width={500}
              height={300}
              data={dataStackedBarChart}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='pv' stackId='a' fill='#8884d8' />
              <Bar dataKey='uv' stackId='a' fill='#82ca9d' />
            </BarChart>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12 gap-8 m-10'>
        <div className='col-span-5 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-3 bg-gray-200 p-3'>
            <svg
              className='h-4 w-4'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2'
              />
            </svg>
            <h2 className='text-sm font-bold'>Số lượng sản phẩm bán chạy nhất</h2>
          </div>
          <div className='flex justify-center p-4'>
            <PieChart width={400} height={400}>
              <Pie
                dataKey='value'
                isAnimationActive={false}
                data={dataTwoSimplePieChart}
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                label
              />
              <Pie
                dataKey='value'
                data={dataTwoSimplePieChart}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill='#82ca9d'
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageAnalytics
