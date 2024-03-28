import Header from '~/components/Header'
import Sidebar from '~/components/Sidebar'

function MainLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className='ml-64'>
        <Header />
        {children}
      </div>
    </>
  )
}

export default MainLayout
