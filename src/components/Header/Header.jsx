/* eslint-disable indent */
import { Avatar, Breadcrumb, Navbar } from 'flowbite-react'
import { useContext } from 'react'
import { HiChartPie, HiMenu, HiUser, HiDesktopComputer, HiShoppingBag } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'

function Header() {
  const { profile } = useContext(AppContext)
  const { pathname } = useLocation()

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
            <Breadcrumb.Item icon={HiMenu}>Danh mục sản phẩm nhỏ</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.product:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiDesktopComputer}>Sản phẩm</Breadcrumb.Item>
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
            <Breadcrumb.Item icon={HiShoppingBag}>Đơn hàng</Breadcrumb.Item>
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
              Sản phẩm
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
            Category
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-subcategory')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.subcategory} icon={HiMenu}>
            Subcategory
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-product')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.product} icon={HiDesktopComputer}>
            Product
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
        </Breadcrumb>
      )
    } else if (pathname.includes('update-staff')) {
      return (
        <Breadcrumb aria-label='Default breadcrumb example'>
          <Breadcrumb.Item href={path.staff} icon={HiUser}>
            Staff
          </Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
  }

  return (
    <Navbar className='fixed left-64 right-0 top-0 border-b border-b-gray-200' fluid>
      {pathname.includes('update') ? renderBreadcrumbUpdate() : renderBreadcrumb()}
      <Avatar
        img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWfMEUxGoOF_p2t5zw6UWg0jO3fuh3LTfz_MZ-COXOQ&s'
        rounded
      >
        <div className='space-y-1 font-medium'>
          <div>{profile.name}</div>
          <div className='text-sm text-gray-500'>{profile.email}</div>
        </div>
      </Avatar>
    </Navbar>
  )
}

export default Header
