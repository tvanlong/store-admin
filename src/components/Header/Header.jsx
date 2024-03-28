/* eslint-disable indent */
import { Avatar, Breadcrumb, Navbar } from 'flowbite-react'
import { HiChartPie, HiMenu, HiUser, HiDesktopComputer, HiShoppingBag } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { path } from '~/constants/path'

function Header() {
  const { pathname } = useLocation()

  const renderBreadcrumb = () => {
    switch (pathname) {
      case path.dashboard:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiChartPie}>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.category:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Category</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.subcategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Subcategory</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.product:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiDesktopComputer}>Product</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.customer:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Customer</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.staff:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Staff</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.order:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiShoppingBag}>Order</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addCategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Category</Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addSubcategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Subcategory</Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addProduct:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiDesktopComputer}>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.addStaff:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Staff</Breadcrumb.Item>
            <Breadcrumb.Item>Add</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.updateCategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Category</Breadcrumb.Item>
            <Breadcrumb.Item>Update</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.updateSubcategory:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiMenu}>Subcategory</Breadcrumb.Item>
            <Breadcrumb.Item>Update</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.updateProduct:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiDesktopComputer}>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Update</Breadcrumb.Item>
          </Breadcrumb>
        )
      case path.updateStaff:
        return (
          <Breadcrumb aria-label='Default breadcrumb example'>
            <Breadcrumb.Item icon={HiUser}>Staff</Breadcrumb.Item>
            <Breadcrumb.Item>Update</Breadcrumb.Item>
          </Breadcrumb>
        )
    }
  }

  return (
    <Navbar className='fixed left-64 right-0 top-0 border-b border-b-gray-200' fluid>
      <Breadcrumb aria-label='Default breadcrumb example'>{renderBreadcrumb()}</Breadcrumb>
      <Avatar
        img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWfMEUxGoOF_p2t5zw6UWg0jO3fuh3LTfz_MZ-COXOQ&s'
        rounded
      >
        <div className='space-y-1 font-medium'>
          <div>Jese Leos</div>
          <div className='text-sm text-gray-500'>jese@gmail.com</div>
        </div>
      </Avatar>
    </Navbar>
  )
}

export default Header
