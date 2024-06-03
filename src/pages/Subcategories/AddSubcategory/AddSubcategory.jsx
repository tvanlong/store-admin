import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { textInputTheme } from '~/utils/theme'
import Select from 'react-select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { subcategorySchema } from '~/schemas/subcategorySchema'
import { createSubcategory } from '~/apis/subcategories.api'
import { toast } from 'sonner'
import { Helmet } from 'react-helmet-async'
import { useCategories } from '~/hooks/useCategories'

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
    mutationFn: (data) => createSubcategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
      navigate('/subcategory')
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
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Thêm danh mục sản phẩm nhỏ
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để thêm danh mục sản phẩm nhỏ mới
        </p>
      </div>
      <form className='mx-40' onSubmit={onSubmit}>
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
