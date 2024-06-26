import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import categoriesApi from '~/apis/categories.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
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
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => categoriesApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      navigate(path.category)
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
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thêm danh mục sản phẩm | Trang quản trị thêm danh mục sản phẩm</title>
        <meta name='description' content='Trang quản trị | Thêm danh mục sản phẩm' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Thêm danh mục sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Thêm danh mục sản phẩm</h2>
          <button
            className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 focus:outline-none'
            type='button'
          >
            Quay lại
          </button>
        </div>
      </div>
      <form className='mx-10' onSubmit={onSubmit}>
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
        {errors.name && <span className='mt-1 text-sm text-red-500'>{errors.name.message}</span>}
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            gradientMonochrome='cyan'
            type='submit'
            isProcessing={isPending}
            disabled={isPending}
          >
            Thêm danh mục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
