import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import usersApi from '~/apis/users.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import NoPermission from '~/pages/NoPermission'
import { staffSchema } from '~/schemas/staffSchema'
import { textInputTheme } from '~/utils/theme'

function AddStaff({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(staffSchema)
  })

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => usersApi.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] })
      navigate('/staff')
    }
  })

  const onSubmit = handleSubmit((data) => {
    toast.promise(mutateAsync({ ...data, role: 'admin' }), {
      loading: 'Đang tiến hành thêm nhân viên...',
      success: () => 'Thêm nhân viên thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Thêm nhân viên thất bại'
      }
    })
  })

  if (profile.role !== 'admin') return <NoPermission />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thêm nhân viên | Trang quản trị thêm nhân viên</title>
        <meta name='description' content='Trang quản trị | Thêm nhân viên' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Thêm nhân viên' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Thêm nhân viên</h2>
          <button
            className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 focus:outline-none'
            type='button'
            onClick={() => navigate(path.staff)}
          >
            Quay lại
          </button>
        </div>
      </div>
      <form className='mx-10' onSubmit={onSubmit}>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên nhân viên' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='name'
            type='text'
            placeholder='Vui lòng nhập tên nhân viên'
            {...register('name')}
            onChange={() => clearErrors('name')}
          />
          {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='email' value='Email nhân viên' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='email'
            type='email'
            placeholder='Vui lòng nhập email nhân viên'
            {...register('email')}
            onChange={() => clearErrors('email')}
          />
          {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='phone' value='SĐT nhân viên' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='phone'
            type='text'
            placeholder='Vui lòng nhập SĐT nhân viên'
            {...register('phone')}
            onChange={() => clearErrors('phone')}
          />
          {errors.phone && <span className='text-sm text-red-500'>{errors.phone.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='password' value='Mật khẩu' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='password'
            type='password'
            placeholder='Mật khẩu'
            {...register('password')}
            onChange={() => clearErrors('password')}
          />
          {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='confirm-password' value='Xác nhận mật khẩu' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='confirm-password'
            type='password'
            placeholder='Xác nhận mật khẩu'
            {...register('confirm_password')}
            onChange={() => clearErrors('confirm_password')}
          />
          {errors.confirm_password && <span className='text-sm text-red-500'>{errors.confirm_password.message}</span>}
        </div>
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            type='submit'
            gradientMonochrome='cyan'
            isProcessing={isPending}
            disabled={isPending}
          >
            Thêm nhân viên
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddStaff
