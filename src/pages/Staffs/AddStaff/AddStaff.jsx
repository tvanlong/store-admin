import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createStaff } from '~/apis/users.api'
import { staffSchema } from '~/schemas/staffSchema'
import { textInputTheme } from '~/utils/theme'

function AddStaff({ setProgress }) {
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
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => createStaff(data),
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

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Thêm nhân viên
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để thêm nhân viên mới
        </p>
      </div>
      <form className='mx-40' onSubmit={onSubmit}>
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
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
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
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
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
          {errors.phone && <span className='text-red-500 text-sm'>{errors.phone.message}</span>}
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
          {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
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
          {errors.confirm_password && <span className='text-red-500 text-sm'>{errors.confirm_password.message}</span>}
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
