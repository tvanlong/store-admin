import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createCategory } from '~/apis/categories.api'
import { categorySchema } from '~/schemas/categorySchema'
import { textInputTheme } from '~/utils/theme'

function AddCategory({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(categorySchema)
  })

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      navigate('/category')
    }
  })

  const onSubmit = handleSubmit((data) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang tiến hành thêm danh mục sản phẩm...',
      success: () => 'Thêm danh mục sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Thêm danh mục sản phẩm thất bại'
      }
    })
  })

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Thêm danh mục sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để thêm danh mục sản phẩm mới
        </p>
      </div>
      <form className='mx-40' onSubmit={onSubmit}>
        <div className='mb-2 block'>
          <Label htmlFor='name' value='Tên danh mục sản phẩm' />
        </div>
        <TextInput
          theme={textInputTheme}
          id='name'
          type='text'
          placeholder='Vui lòng nhập tên danh mục sản phẩm'
          {...register('name')}
          onChange={() => clearErrors('name')}
        />
        {errors.name && <span className='text-red-500 text-sm mt-1'>{errors.name.message}</span>}
        <div className='flex justify-center'>
          <Button className='mt-10' gradientMonochrome='cyan' type='submit'>
            Thêm danh mục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
