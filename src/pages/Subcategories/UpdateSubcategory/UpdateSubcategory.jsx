import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'sonner'
import subcategoriesApi from '~/apis/subcategories.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
import { useCategories } from '~/hooks/useCategories'
import { subcategorySchema } from '~/schemas/subcategorySchema'
import { textInputTheme } from '~/utils/theme'

function UpdateSubcategory({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: subcategoryData } = useQuery({
    queryKey: ['subcategory', id],
    queryFn: () => subcategoriesApi.getSubcategory(id)
  })
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
    clearErrors,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      category: ''
    },
    resolver: yupResolver(subcategorySchema)
  })

  useEffect(() => {
    const subcategory = subcategoryData?.data?.data
    if (subcategory) {
      setValue('name', subcategory.name)
      setValue('category', subcategory.category._id)
    }
  }, [subcategoryData, setValue])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => subcategoriesApi.updateSubcategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      queryClient.invalidateQueries({ queryKey: ['subcategory', id] })
      navigate(path.subcategory)
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
        <title>Cập nhật danh mục sản phẩm nhỏ | Trang quản trị cập nhật danh mục sản phẩm nhỏ</title>
        <meta name='description' content='Trang quản trị | Cập nhật danh mục sản phẩm nhỏ' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Cập nhật danh mục sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Cập nhật danh mục sản phẩm</h2>
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
              value={categoryOptions ? categoryOptions.find((option) => option.value === watch('category')) : null}
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
            onChange={() => {
              clearErrors('name')
            }}
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
            Cập nhật danh mục nhỏ
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSubcategory
