import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'sonner'
import subcategoriesApi from '~/apis/subcategories.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
import { useCategories } from '~/hooks/useCategories'
import { subcategorySchema } from '~/schemas/subcategorySchema'
import { textInputTheme } from '~/utils/theme'

function AddSubcategory({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useCategories()

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const categoryOptions = data?.data?.data.map((category) => {
    return {
      value: category._id,
      label: category.name
    }
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: '',
      category: ''
    },
    resolver: yupResolver(subcategorySchema)
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => subcategoriesApi.createSubcategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      navigate(path.subcategory)
    }
  })

  const onSubmit = handleSubmit((data) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang tiến hành thêm danh mục sản phẩm nhỏ...',
      success: () => 'Thêm danh mục sản phẩm nhỏ thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Thêm danh mục sản phẩm nhỏ thất bại'
      }
    })
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thêm danh mục sản phẩm nhỏ | Trang quản trị thêm danh mục sản phẩm nhỏ</title>
        <meta name='description' content='Trang quản trị | Thêm danh mục sản phẩm nhỏ' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Thêm danh mục sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Thêm danh mục sản phẩm</h2>
          <button
            className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 focus:outline-none'
            type='button'
            onClick={() => navigate(path.subcategory)}
          >
            Quay lại
          </button>
        </div>
      </div>
      <form className='mx-10' onSubmit={onSubmit}>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='category-name' value='Thuộc danh mục sản phẩm' />
          </div>
          <div className='remove-input-txt-border'>
            <Select
              placeholder='Chọn danh mục sản phẩm'
              options={categoryOptions}
              className='text-sm'
              isClearable
              isSearchable
              {...register('category')}
              onChange={(selectedOption) => {
                if (errors.category) clearErrors('category')
                setValue('category', selectedOption?.value)
              }}
            />
          </div>
          {errors.category && <span className='text-sm text-red-500'>{errors.category.message}</span>}
        </div>
        <div className='mb-5'>
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
          {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
        </div>
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            type='submit'
            gradientMonochrome='cyan'
            isProcessing={isPending}
            disabled={isPending}
          >
            Thêm danh mục nhỏ
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddSubcategory
