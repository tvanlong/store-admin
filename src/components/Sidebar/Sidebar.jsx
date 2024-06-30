import { useMutation } from '@tanstack/react-query'
import { Sidebar as SideBar } from 'flowbite-react'
import { useContext } from 'react'
import {
  HiChartPie,
  HiChartSquareBar,
  HiChip,
  HiDesktopComputer,
  HiOutlineLogout,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiShoppingCart,
  HiUser,
  HiUserGroup
} from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import authApi from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { sidebarTheme } from '~/utils/theme'

function Sidebar() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useContext(AppContext)
  const { pathname } = useLocation()
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
    <SideBar
      theme={sidebarTheme}
      className='fixed bottom-0 left-0 top-0 bg-blue-500'
      aria-label='SideBar with logo branding example'
    >
      <SideBar.Logo img='https://flowbite-react.com/favicon.svg' imgAlt='Flowbite logo'>
        LAPTOP STORE
      </SideBar.Logo>
      <SideBar.Items>
        <SideBar.ItemGroup>
          <SideBar.Item
            className={pathname === path.dashboard ? 'bg-[#2d5171]' : ''}
            href={path.dashboard}
            icon={HiChartPie}
          >
            Bảng tin
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.category) ? 'bg-[#2d5171]' : ''}
            href={path.category}
            icon={HiOutlineViewGrid}
          >
            Danh mục chính
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.subcategory) ? 'bg-[#2d5171]' : ''}
            href={path.subcategory}
            icon={HiOutlineViewList}
          >
            Danh mục phụ
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.product) ? 'bg-[#2d5171]' : ''}
            href={path.product}
            icon={HiDesktopComputer}
          >
            Dòng sản phẩm
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.version) || pathname.includes(path.accessory) ? 'bg-[#2d5171]' : ''}
            href={path.version}
            icon={HiChip}
          >
            Phiên bản sản phẩm
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.customer) ? 'bg-[#2d5171]' : ''}
            href={path.customer}
            icon={HiUser}
          >
            Khách hàng
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.staff) ? 'bg-[#2d5171]' : ''}
            href={path.staff}
            icon={HiUserGroup}
          >
            Nhân viên
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.order) ? 'bg-[#2d5171]' : ''}
            href={path.order}
            icon={HiShoppingCart}
          >
            Đơn hàng
          </SideBar.Item>
          <SideBar.Item
            className={pathname.includes(path.analytics) ? 'bg-[#2d5171]' : ''}
            href={path.analytics}
            icon={HiChartSquareBar}
          >
            Thống kê
          </SideBar.Item>
          {isAuthenticated && (
            <SideBar.Item to={''} icon={HiOutlineLogout} onClick={handleSignOut}>
              Đăng xuất
            </SideBar.Item>
          )}
        </SideBar.ItemGroup>
      </SideBar.Items>
    </SideBar>
  )
}

export default Sidebar
