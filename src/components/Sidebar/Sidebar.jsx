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
import { Link } from 'react-router-dom'
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
          <SideBar.Item icon={HiChartPie}>
            <Link to={path.dashboard}>Bảng tin</Link>
          </SideBar.Item>
          <SideBar.Collapse
            icon={HiMenu}
            label='Danh mục'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item>
              <Link to={path.category}>Tất cả danh mục</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.addCategory}>Thêm danh mục mới</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.subcategory}>Tất cả danh mục nhỏ</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.addSubcategory}>Thêm danh mục nhỏ mới</Link>
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiDesktopComputer}
            label='Sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item>
              <Link to={path.product}>Tất cả sản phẩm</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.addProduct}>Thêm sản phẩm mới</Link>
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiUser}
            label='Người dùng'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm
              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item>
              <Link to={path.customer}>Tất cả khách hàng</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.staff}>Tất cả nhân viên</Link>
            </SideBar.Item>
            <SideBar.Item>
              <Link to={path.addStaff}>Thêm nhân viên mới</Link>
            </SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Item icon={HiShoppingBag}>
            <Link to={path.order}>Đơn hàng</Link>
          </SideBar.Item>
          <SideBar.Item icon={HiArrowSmRight}>Đăng nhập</SideBar.Item>
          <SideBar.Item icon={HiArrowSmLeft}>Đăng xuất</SideBar.Item>
        </SideBar.ItemGroup>
      </SideBar.Items>
    </SideBar>
  )
}

export default Sidebar
