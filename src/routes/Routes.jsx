import { useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout'
import AddCategory from '~/pages/Categories/AddCategory'
import Category from '~/pages/Categories/Category'
import UpdateCategory from '~/pages/Categories/UpdateCategory'
import Customer from '~/pages/Customers/Customer'
import Dashboard from '~/pages/Dashboard'
import Login from '~/pages/Login'
import Order from '~/pages/Order'
import AddProduct from '~/pages/Products/AddProduct'
import Product from '~/pages/Products/Product'
import UpdateProduct from '~/pages/Products/UpdateProduct'
import AddStaff from '~/pages/Staffs/AddStaff'
import Staff from '~/pages/Staffs/Staff'
import UpdateStaff from '~/pages/Staffs/UpdateStaff'
import AddSubcategory from '~/pages/Subcategories/AddSubcategory'
import Subcategory from '~/pages/Subcategories/Subcategory'
import UpdateSubcategory from '~/pages/Subcategories/UpdateSubcategory'

function Routes() {
  return useRoutes([
    {
      path: path.dashboard,
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: <Login />
    },
    {
      path: path.category,
      element: (
        <MainLayout>
          <Category />
        </MainLayout>
      )
    },
    {
      path: path.addCategory,
      element: (
        <MainLayout>
          <AddCategory />
        </MainLayout>
      )
    },
    {
      path: path.updateCategory,
      element: (
        <MainLayout>
          <UpdateCategory />
        </MainLayout>
      )
    },
    {
      path: path.subcategory,
      element: (
        <MainLayout>
          <Subcategory />
        </MainLayout>
      )
    },
    {
      path: path.addSubcategory,
      element: (
        <MainLayout>
          <AddSubcategory />
        </MainLayout>
      )
    },
    {
      path: path.updateSubcategory,
      element: (
        <MainLayout>
          <UpdateSubcategory />
        </MainLayout>
      )
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <Product />
        </MainLayout>
      )
    },
    {
      path: path.addProduct,
      element: (
        <MainLayout>
          <AddProduct />
        </MainLayout>
      )
    },
    {
      path: path.updateProduct,
      element: (
        <MainLayout>
          <UpdateProduct />
        </MainLayout>
      )
    },
    {
      path: path.staff,
      element: (
        <MainLayout>
          <Staff />
        </MainLayout>
      )
    },
    {
      path: path.addStaff,
      element: (
        <MainLayout>
          <AddStaff />
        </MainLayout>
      )
    },
    {
      path: path.updateStaff,
      element: (
        <MainLayout>
          <UpdateStaff />
        </MainLayout>
      )
    },
    {
      path: path.customer,
      element: (
        <MainLayout>
          <Customer />
        </MainLayout>
      )
    },
    {
      path: path.order,
      element: (
        <MainLayout>
          <Order />
        </MainLayout>
      )
    }
  ])
}

export default Routes
