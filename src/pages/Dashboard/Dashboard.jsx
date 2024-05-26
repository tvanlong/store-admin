import { useEffect } from 'react'
import Cards from './components/Cards'
import DashboardChart from './components/DashboardChart'
import { Helmet } from 'react-helmet-async'

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
    <div className='mt-[68px]'>
      <Helmet>
        <title>Trang quản trị | Thông tin tổng quan</title>
        <meta name='description' content='Trang quản trị | Thông tin tổng quan' />
      </Helmet>
      <Cards />
      <DashboardChart />
    </div>
  )
}

export default Dashboard
