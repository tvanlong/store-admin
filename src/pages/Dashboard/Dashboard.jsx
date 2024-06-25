import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Cards from './components/Cards'
import CustomerTable from './components/CustomerTable'
import DashboardChart from './components/DashboardChart'
import SellingTable from './components/SellingTable'

function Dashboard({ setProgress }) {
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
        <title>Trang quản trị | Thông tin tổng quan</title>
        <meta name='description' content='Trang quản trị | Thông tin tổng quan' />
      </Helmet>
      <Cards />
      <DashboardChart />
      <div className='grid grid-cols-12 mx-10 my-20 gap-8'>
        <SellingTable />
        <CustomerTable />
      </div>
    </div>
  )
}

export default Dashboard
