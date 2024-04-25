import { useMutation } from '@tanstack/react-query'
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
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { signOut } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { sidebarTheme } from '~/utils/theme'

function Sidebar() {
  const { mutateAsync } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      window.location.href = path.login
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
            label='Danh mục lớn'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.category}>Tất cả danh mục</SideBar.Item>
            <SideBar.Item href={path.addCategory}>Thêm danh mục mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiMenu}
            label='Danh mục nhỏ'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.subcategory}>Tất cả danh mục nhỏ</SideBar.Item>
            <SideBar.Item href={path.addSubcategory}>Thêm danh mục nhỏ mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiDesktopComputer}
            label='Dòng sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.product}>Tất cả sản phẩm</SideBar.Item>
            <SideBar.Item href={path.addProduct}>Thêm sản phẩm mới</SideBar.Item>
          </SideBar.Collapse>
          <SideBar.Collapse
            icon={HiDesktopComputer}
            label='Phiên bản sản phẩm'
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />
            }}
          >
            <SideBar.Item href={path.version}>Tất cả phiên bản</SideBar.Item>
            <SideBar.Item href={path.addVersion}>Thêm phiên bản mới</SideBar.Item>
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
          <SideBar.Item to={''} icon={HiArrowSmLeft} onClick={handleSignOut}>
            Đăng xuất
          </SideBar.Item>
        </SideBar.ItemGroup>
      </SideBar.Items>
    </SideBar>
  )
}

export default Sidebar
