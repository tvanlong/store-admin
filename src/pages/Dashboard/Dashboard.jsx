import { useEffect } from 'react'
import Cards from './components/Cards'
import DashboardChart from './components/DashboardChart'

function Dashboard({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  return (
    <div className='mt-[68px]'>
      <Cards />
      <DashboardChart />
    </div>
  )
}

export default Dashboard
