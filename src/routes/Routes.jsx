import { useContext, useState } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
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

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nếu đã đăng nhập thì cho phép truy cập các route con, ngược lại chuyển hướng về trang login
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nếu đã đăng nhập thì chuyển hướng về trang chủ, ngược lại cho phép truy cập các route con
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

function Routes() {
  const [progress, setProgress] = useState(0)
  const element = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <MainLayout>
              <Dashboard setProgress={setProgress} />
            </MainLayout>
          )
        },

        {
          path: path.category,
          element: (
            <MainLayout>
              <Category setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.addCategory,
          element: (
            <MainLayout>
              <AddCategory setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.updateCategory,
          element: (
            <MainLayout>
              <UpdateCategory setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.subcategory,
          element: (
            <MainLayout>
              <Subcategory setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.addSubcategory,
          element: (
            <MainLayout>
              <AddSubcategory setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.updateSubcategory,
          element: (
            <MainLayout>
              <UpdateSubcategory setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.product,
          element: (
            <MainLayout>
              <Product setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.addProduct,
          element: (
            <MainLayout>
              <AddProduct setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.updateProduct,
          element: (
            <MainLayout>
              <UpdateProduct setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.staff,
          element: (
            <MainLayout>
              <Staff setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.addStaff,
          element: (
            <MainLayout>
              <AddStaff setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.updateStaff,
          element: (
            <MainLayout>
              <UpdateStaff setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.customer,
          element: (
            <MainLayout>
              <Customer setProgress={setProgress} />
            </MainLayout>
          )
        },
        {
          path: path.order,
          element: (
            <MainLayout>
              <Order setProgress={setProgress} />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        }
      ]
    }
  ])

  return (
    <div>
      <LoadingBar color='#337AB7' progress={progress} onLoaderFinished={() => setProgress(0)} />
      {element}
    </div>
  )
}

export default Routes
