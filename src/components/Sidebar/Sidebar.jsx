import { useMutation } from '@tanstack/react-query'
import { Sidebar as SideBar } from 'flowbite-react'
import { useContext } from 'react'
import {
  HiChartPie,
  HiChartSquareBar,
  HiChip,
  HiDesktopComputer,
  HiLogout,
  HiOutlineMinusSm,
  HiOutlinePlusCircle,
  HiOutlinePlusSm,
  HiOutlineViewList,
  HiShoppingCart,
  HiUser,
  HiUserGroup
} from 'react-icons/hi'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { signOut, signOutStaff } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { sidebarTheme } from '~/utils/theme'

function Sidebar() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const { mutateAsync } = useMutation({
    mutationFn: profile.role === 'admin' ? signOut : signOutStaff,
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
          <SideBar.Item href={path.dashboard} icon={HiChartPie}>
            Bảng tin
          </SideBar.Item>
          <SideBar.Collapse
            icon={HiOutlineViewList}
            label='Danh mục lớn'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.category} icon={HiOutlineViewList}>
              Danh mục sản phẩm
            </SideBar.Item>
            <SideBar.Item href={path.addCategory} icon={HiOutlinePlusCircle}>
              Thêm mới
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiOutlineViewList}
            label='Danh mục nhỏ'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.subcategory} icon={HiOutlineViewList}>
              Danh mục sản phẩm
            </SideBar.Item>
            <SideBar.Item href={path.addSubcategory} icon={HiOutlinePlusCircle}>
              Thêm mới
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiDesktopComputer}
            label='Dòng sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.product} icon={HiOutlineViewList}>
              Dòng sản phẩm
            </SideBar.Item>
            <SideBar.Item href={path.addProduct} icon={HiOutlinePlusCircle}>
              Thêm mới
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiChip}
            label='Cấu hình sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.version} icon={HiOutlineViewList}>
              Phiên bản sản phẩm
            </SideBar.Item>
            <SideBar.Item href={path.accessory} icon={HiOutlineViewList}>
              Linh kiện sản phẩm
            </SideBar.Item>
            <SideBar.Item href={path.addVersion} icon={HiOutlinePlusCircle}>
              Thêm mới
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiUserGroup}
            label='Người dùng'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm
              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.customer} icon={HiUser}>
              Khách hàng
            </SideBar.Item>
            <SideBar.Item href={path.staff} icon={HiUser}>
              Nhân viên
            </SideBar.Item>
            <SideBar.Item href={path.addStaff} icon={HiOutlinePlusCircle}>
              Thêm nhân viên mới
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Item href={path.order} icon={HiShoppingCart}>
            Đơn hàng
          </SideBar.Item>
          <SideBar.Item href={path.analytics} icon={HiChartSquareBar}>
            Thống kê
          </SideBar.Item>
          {isAuthenticated && (
            <SideBar.Item to={''} icon={HiLogout} onClick={handleSignOut}>
              Đăng xuất
            </SideBar.Item>
          )}
        </SideBar.ItemGroup>
      </SideBar.Items>
    </SideBar>
  )
}

export default Sidebar
