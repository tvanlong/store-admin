import { Sidebar as SideBar } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiArrowSmLeft,
  HiShoppingBag,
  HiDesktopComputer,
  HiMenu,
  HiUser,
  HiOutlineMinusSm,
  HiOutlinePlusSm
} from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { path } from '~/constants/path'
import { sidebarTheme } from '~/utils/theme'

function Sidebar() {
  return (
    <SideBar
      theme={sidebarTheme}
      className='fixed top-0 left-0 bottom-0 bg-blue-500'
      aria-label='SideBar with logo branding example'
    >
      <SideBar.Logo
        img='https://png.pngtree.com/png-clipart/20221227/original/pngtree-host-and-admin-marketing-job-vacancies-vector-png-image_8815346.png'
        imgAlt='Flowbite logo'
      >
        SYSTEM ADMIN
      </SideBar.Logo>
      <SideBar.Items>
        <SideBar.ItemGroup>
          <SideBar.Item href={path.dashboard} icon={HiChartPie}>
            Bảng tin
          </SideBar.Item>
          <SideBar.Collapse
            icon={HiMenu}
            label='Danh mục'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.category}>Tất cả danh mục</SideBar.Item>
            <SideBar.Item href={path.addCategory}>Thêm danh mục mới</SideBar.Item>
            <SideBar.Item href={path.subcategory}>Tất cả danh mục nhỏ</SideBar.Item>
            <SideBar.Item href={path.addSubcategory}>Thêm danh mục nhỏ mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiDesktopComputer}
            label='Sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.product}>Tất cả sản phẩm</SideBar.Item>
            <SideBar.Item href={path.addProduct}>Thêm sản phẩm mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiUser}
            label='Người dùng'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm
              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.customer}>Tất cả khách hàng</SideBar.Item>
            <SideBar.Item href={path.staff}>Tất cả nhân viên</SideBar.Item>
            <SideBar.Item href={path.addStaff}>Thêm nhân viên mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Item href={path.order} icon={HiShoppingBag}>
            Đơn hàng
          </SideBar.Item>
          <SideBar.Item href={path.login} icon={HiArrowSmRight}>
            Đăng nhập
          </SideBar.Item>
          <SideBar.Item href={path.logout} icon={HiArrowSmLeft}>
            Đăng xuất
          </SideBar.Item>
        </SideBar.ItemGroup>
      </SideBar.Items>
    </SideBar>
  )
}

export default Sidebar
