import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import categoriesApi from '~/apis/categories.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
import { categorySchema } from '~/schemas/categorySchema'
import { textInputTheme } from '~/utils/theme'

function UpdateCategory({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getCategoryById(id)
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(categorySchema)
  })

  useEffect(() => {
    if (data) {
      setValue('name', data.data.data.name)
    }
  }, [data, setValue])

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
    mutationFn: (data) => categoriesApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', id] })
      navigate(path.category)
    }
  })

  const onSubmit = handleSubmit((data) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang tiến hành cập nhật danh mục sản phẩm...',
      success: () => 'Cập nhật danh mục sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Cập nhật danh mục sản phẩm thất bại'
      }
    })
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Cập nhật danh mục sản phẩm | Trang quản trị cập nhật danh mục sản phẩm</title>
        <meta name='description' content='Trang quản trị | Cập nhật danh mục sản phẩm' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Cập nhật danh mục sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Cập nhật danh mục sản phẩm</h2>
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
        {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            type='submit'
            gradientMonochrome='cyan'
            isProcessing={isPending}
            disabled={isPending}
          >
            Cập nhật danh mục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCategory
