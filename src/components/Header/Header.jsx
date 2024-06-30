/* eslint-disable indent */
import { useMutation } from '@tanstack/react-query'
import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useContext, useMemo } from 'react'
import { HiCog, HiCurrencyDollar, HiLogout, HiUser, HiViewGrid } from 'react-icons/hi'
import { toast } from 'sonner'
import authApi from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { useOrders } from '~/hooks/useOrders'

function Header() {
  const { setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const { data: ordersData } = useOrders()
  const totalPendingOrders = useMemo(
    () => ordersData?.data?.data.filter((order) => order.status === 'Chờ xác nhận').length || 0,
    [ordersData]
  )

  const { mutateAsync } = useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleSignOut = () => {
    toast.promise(mutateAsync(), {
      loading: 'Đang đăng xuất...',
      success: 'Đăng xuất thành công',
      error: 'Đăng xuất thất bại'
    })
  }

  return (
    <Navbar className='fixed left-64 right-0 top-0 z-10 border-b border-b-gray-200' fluid>
      <div className='relative mt-1 lg:w-96 ml-5'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            className='w-5 h-5 text-gray-500'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <input
          type='text'
          name='email'
          id='topbar-search'
          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5'
          placeholder='Search'
        />
      </div>
      <Dropdown color={'transparent'} label={<Avatar bordered img={profile?.avatar} rounded></Avatar>} arrowIcon={null}>
        <Dropdown.Header>
          <span className='block text-sm'>
            {profile?.name} ({profile?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'})
          </span>
          <span className='block truncate text-sm font-medium'>{profile?.email}</span>
        </Dropdown.Header>
        <Dropdown.Item href={path.dashboard} icon={HiViewGrid}>
          Bảng điều khiển
        </Dropdown.Item>
        <Dropdown.Item href={path.profile} icon={HiUser}>
          Thông tin tài khoản
        </Dropdown.Item>
        <Dropdown.Item href={path.order} icon={HiCurrencyDollar}>
          Đơn hàng chờ duyệt ({totalPendingOrders})
        </Dropdown.Item>
        <Dropdown.Item icon={HiCog}>Cài đặt</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut} icon={HiLogout}>
          Đăng xuất
        </Dropdown.Item>
      </Dropdown>
    </Navbar>
  )
}

export default Header
