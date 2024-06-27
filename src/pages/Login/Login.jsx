import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signIn } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { signInSchema } from '~/schemas/authSchema'

function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInSchema)
  })

  const signInMutation = useMutation({
    mutationFn: (data) => signIn(data)
  })

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading('Đang tiến hành đăng nhập...')
    try {
      const res = await signInMutation.mutateAsync(data)
      if (res.data.data.role === 'admin' || res.data.data.role === 'staff') {
        setIsAuthenticated(true)
        setProfile(res.data.data)
        navigate(path.dashboard)
        toast.success('Đăng nhập thành công', { id: toastId })
      } else {
        toast.error('Bạn không có quyền truy cập vào trang quản trị', { id: toastId })
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Đăng nhập thất bại', { id: toastId })
    }
  })

  const onChange = (e) => {
    setValue(e.target.name, e.target.value)
  }
  return (
    <section className='bg-gray-50'>
      <Helmet>
        <title>Trang quản trị | Đăng nhập</title>
        <meta name='description' content='Trang quản trị | Đăng nhập' />
      </Helmet>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a href='#' className='flex items-center mb-6 text-2xl text-gray-900'>
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
          Hệ thống quản trị
        </a>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl leading-tight tracking-tight text-gray-900 md:text-2xl'>Đăng nhập vào tài khoản</h1>
            <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  placeholder='name@company.com'
                  onChange={(e) => onChange(e)}
                  {...register('email')}
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
                  onChange={(e) => onChange(e)}
                  {...register('password')}
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500'>
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                </div>
                <a href='#' className='text-sm text-blue-700 font-medium hover:underline'>
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Đăng nhập
              </button>
              <p className='text-sm font-light text-gray-500'>
                Bạn chưa có tài khoản?{' '}
                <Link to={path.register} className='font-medium text-blue-700 hover:underline'>
                  Đăng ký ngay
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
