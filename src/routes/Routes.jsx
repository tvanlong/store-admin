import { Suspense, lazy, useContext, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Loading from '~/components/Loading'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import MainLayout from '~/layouts/MainLayout'
import ErrorPage from '~/pages/ErrorPage'
import NoPermission from '~/pages/NoPermission'
import NotFound from '~/pages/NotFound'

const Dashboard = lazy(() => import('~/pages/Dashboard'))
const AddCategory = lazy(() => import('~/pages/Categories/AddCategory'))
const Category = lazy(() => import('~/pages/Categories/Category'))
const UpdateCategory = lazy(() => import('~/pages/Categories/UpdateCategory'))
const Customer = lazy(() => import('~/pages/Customers/Customer'))
const Login = lazy(() => import('~/pages/Login'))
const Register = lazy(() => import('~/pages/Register'))
const Order = lazy(() => import('~/pages/Order'))
const AddProduct = lazy(() => import('~/pages/Products/AddProduct'))
const Product = lazy(() => import('~/pages/Products/Product'))
const UpdateProduct = lazy(() => import('~/pages/Products/UpdateProduct'))
const Version = lazy(() => import('~/pages/Versions/Version'))
const TrashVersion = lazy(() => import('~/pages/Versions/TrashVersion'))
const Accessory = lazy(() => import('~/pages/Versions/Accessory'))
const AddVersion = lazy(() => import('~/pages/Versions/AddVersion'))
const UpdateVersion = lazy(() => import('~/pages/Versions/UpdateVersion'))
const AddStaff = lazy(() => import('~/pages/Staffs/AddStaff'))
const Staff = lazy(() => import('~/pages/Staffs/Staff'))
const TrashStaff = lazy(() => import('~/pages/Staffs/TrashStaff'))
const UpdateStaff = lazy(() => import('~/pages/Staffs/UpdateStaff'))
const AddSubcategory = lazy(() => import('~/pages/Subcategories/AddSubcategory'))
const Subcategory = lazy(() => import('~/pages/Subcategories/Subcategory'))
const UpdateSubcategory = lazy(() => import('~/pages/Subcategories/UpdateSubcategory'))
const Profile = lazy(() => import('~/pages/Profile'))
const PageAnalytics = lazy(() => import('~/pages/PageAnalytics'))

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
          path: path.trashVersion,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <TrashVersion setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.accessory,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Accessory setProgress={setProgress} />
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
          path: path.trashStaff,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <TrashStaff setProgress={setProgress} />
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
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Profile setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.analytics,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <PageAnalytics setProgress={setProgress} />
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
          element: (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: path.noPermission,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <NoPermission />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <div>
      <LoadingBar color='#337AB7' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <ErrorBoundary fallback={<ErrorPage />}>{element}</ErrorBoundary>
    </div>
  )
}

export default Routes
