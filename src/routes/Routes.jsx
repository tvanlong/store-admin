import { Suspense, lazy, useContext, useState } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import MainLayout from '~/layouts/MainLayout'
import Loading from '~/components/Loading'

const Dashboard = lazy(() => import('~/pages/Dashboard'))
const AddCategory = lazy(() => import('~/pages/Categories/AddCategory'))
const Category = lazy(() => import('~/pages/Categories/Category'))
const UpdateCategory = lazy(() => import('~/pages/Categories/UpdateCategory'))
const Customer = lazy(() => import('~/pages/Customers/Customer'))
const Login = lazy(() => import('~/pages/Login'))
const Order = lazy(() => import('~/pages/Order'))
const AddProduct = lazy(() => import('~/pages/Products/AddProduct'))
const Product = lazy(() => import('~/pages/Products/Product'))
const UpdateProduct = lazy(() => import('~/pages/Products/UpdateProduct'))
const Version = lazy(() => import('~/pages/Versions/Version'))
const AddVersion = lazy(() => import('~/pages/Versions/AddVersion'))
const UpdateVersion = lazy(() => import('~/pages/Versions/UpdateVersion'))
const AddStaff = lazy(() => import('~/pages/Staffs/AddStaff'))
const Staff = lazy(() => import('~/pages/Staffs/Staff'))
const UpdateStaff = lazy(() => import('~/pages/Staffs/UpdateStaff'))
const AddSubcategory = lazy(() => import('~/pages/Subcategories/AddSubcategory'))
const Subcategory = lazy(() => import('~/pages/Subcategories/Subcategory'))
const UpdateSubcategory = lazy(() => import('~/pages/Subcategories/UpdateSubcategory'))

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
              <Suspense fallback={<Loading />}>
                <Dashboard setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.category,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Category setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addCategory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <AddCategory setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.updateCategory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <UpdateCategory setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.subcategory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Subcategory setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addSubcategory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <AddSubcategory setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.updateSubcategory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <UpdateSubcategory setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.product,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Product setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addProduct,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <AddProduct setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.updateProduct,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <UpdateProduct setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.version,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Version setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addVersion,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <AddVersion setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.updateVersion,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <UpdateVersion setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.staff,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Staff setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.addStaff,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <AddStaff setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.updateStaff,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <UpdateStaff setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.customer,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Customer setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.order,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Order setProgress={setProgress} />
              </Suspense>
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
