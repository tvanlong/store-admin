/* eslint-disable indent */
import { useMutation } from '@tanstack/react-query'
import { Avatar, Breadcrumb, Dropdown, Navbar } from 'flowbite-react'
import { useContext, useMemo } from 'react'
import {
  HiChartPie,
  HiChip,
  HiCog,
  HiCurrencyDollar,
  HiDesktopComputer,
  HiLogout,
  HiMenu,
  HiMenuAlt4,
  HiShoppingCart,
  HiUser,
  HiViewGrid
} from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { signOut } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { useOrders } from '~/hooks/useOrders'

function Header() {
  const { profile } = useContext(AppContext)
  const { pathname } = useLocation()
  const { data: ordersData } = useOrders()
  const totalPendingOrders = useMemo(
    () => ordersData?.data?.data.filter((order) => order.status === 'Chờ xác nhận').length || 0,
    [ordersData]
  )

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

  const renderBreadcrumb = () => {
    switch (pathname) {
      case path.dashboard:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiChartPie}>Bảng điều khiển</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.category:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Danh mục sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.subcategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenuAlt4}>Danh mục sản phẩm nhỏ</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.product:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiDesktopComputer}>Dòng sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.version:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiChip}>Phiên bản sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.customer:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Khách hàng</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.staff:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Nhân viên</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.order:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiShoppingCart}>Đơn hàng</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.profile:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Thông tin tài khoản</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addCategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item href={path.category} icon={HiMenu}>
              Danh mục sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addSubcategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item href={path.subcategory} icon={HiMenu}>
              Danh mục sản phẩm nhỏ
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addProduct:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item href={path.product} icon={HiDesktopComputer}>
              Dòng sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addVersion:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item href={path.product} icon={HiDesktopComputer}>
              Phiên bản sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addStaff:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item href={path.staff} icon={HiUser}>
              Nhân viên
            </Breadcrumb.Item>
            <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
          </Breadcrumb>
        )
    }
  }

  const renderBreadcrumbUpdate = () => {
    if (pathname.includes('update-category')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.category} icon={HiMenu}>
            Danh mục sản phẩm
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-subcategory')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.subcategory} icon={HiMenu}>
            Danh mục sản phẩm nhỏ
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-product')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.product} icon={HiDesktopComputer}>
            Dòng sản phẩm
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-version')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.product} icon={HiDesktopComputer}>
            Phiên bản sản phẩm
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-staff')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.staff} icon={HiUser}>
            Nhân viên
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
  }

  return (
    <Navbar className='fixed left-64 right-0 top-0 border-b border-b-gray-200' fluid>
      {pathname.includes('update') ? renderBreadcrumbUpdate() : renderBreadcrumb()}
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
