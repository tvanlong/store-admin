import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

function Register() {
  return (
    <section className='bg-gray-50'>
      <Helmet>
        <title>Trang quản trị | Đăng ký</title>
        <meta name='description' content='Trang quản trị | Đăng ký' />
      </Helmet>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900'>
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Hệ thống quản trị
        </a>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>Tạo tài khoản</h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  placeholder='name@company.com'
                />
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                />
              </div>
              <div>
                <label htmlFor='confirm-password' className='block mb-2 text-sm font-medium text-gray-900'>
                  Xác nhận mật khẩu
                </label>
                <input
                  type='confirm-password'
                  name='confirm-password'
                  id='confirm-password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                />
              </div>

              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Đăng ký
              </button>
              <p className='text-sm font-light text-gray-500'>
                Bạn đã có tài khoản?{' '}
                <Link to={path.login} className='font-medium text-blue-600 hover:underline'>
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
