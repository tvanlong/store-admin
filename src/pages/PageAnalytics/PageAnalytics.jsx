import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import Breadcrumb from '~/components/Breadcrumb'
import AreaChart from './components/AreaChart'

const dataLineChart = [
  {
    name: 'T1',
    uv: 40000000,
    pv: 24000000,
    amt: 24000000
  },
  {
    name: 'T2',
    uv: 30000000,
    pv: 13980000,
    amt: 22100000
  },
  {
    name: 'T3',
    uv: 20000000,
    pv: 98000000,
    amt: 22900000
  },
  {
    name: 'T4',
    uv: 27800000,
    pv: 39080000,
    amt: 20000000
  },
  {
    name: 'T5',
    uv: 18900000,
    pv: 48000000,
    amt: 21810000
  },
  {
    name: 'T6',
    uv: 23900000,
    pv: 38000000,
    amt: 25000000
  },
  {
    name: 'T7',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  },
  {
    name: 'T8',
    uv: 33900000,
    pv: 40000000,
    amt: 21000000
  },
  {
    name: 'T9',
    uv: 24900000,
    pv: 34000000,
    amt: 21000000
  },
  {
    name: 'T10',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  },
  {
    name: 'T11',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  },
  {
    name: 'T12',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  }
]

const dataStackedBarChart = [
  {
    name: 'T1',
    uv: 40000000,
    pv: 24000000,
    amt: 24000000
  },
  {
    name: 'T2',
    uv: 30000000,
    pv: 13980000,
    amt: 22100000
  },
  {
    name: 'T3',
    uv: 20000000,
    pv: 98000000,
    amt: 22900000
  },
  {
    name: 'T4',
    uv: 27800000,
    pv: 39080000,
    amt: 20000000
  },
  {
    name: 'T5',
    uv: 18900000,
    pv: 48000000,
    amt: 21810000
  },
  {
    name: 'T6',
    uv: 23900000,
    pv: 38000000,
    amt: 25000000
  },
  {
    name: 'T7',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  },
  {
    name: 'T8',
    uv: 34900000,
    pv: 42000000,
    amt: 20000000
  },
  {
    name: 'T9',
    uv: 32900000,
    pv: 40000000,
    amt: 25000000
  },
  {
    name: 'T10',
    uv: 32900000,
    pv: 46000000,
    amt: 24000000
  },
  {
    name: 'T11',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  },
  {
    name: 'T12',
    uv: 34900000,
    pv: 43000000,
    amt: 21000000
  }
]

const dataTwoSimplePieChart = [
  { name: 'Laptop Dell', value: 28 },
  { name: 'Laptop Asus', value: 7 },
  { name: 'Laptop Lenovo', value: 15 },
  { name: 'Laptop Acer', value: 19 },
  { name: 'Laptop MSI', value: 10 },
  { name: 'Macbook', value: 21 }
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
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Thống kê cửa hàng' />
        <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Thống kê cửa hàng</h2>
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
              <XAxis fontSize={10} dataKey='name' />
              <YAxis fontSize={10} />
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
                d='M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z'
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
              <XAxis fontSize={10} dataKey='name' />
              <YAxis fontSize={10} />
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
                d='M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z'
              />
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z'
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
