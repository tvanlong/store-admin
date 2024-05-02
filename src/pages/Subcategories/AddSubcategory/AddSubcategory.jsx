import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { textInputTheme } from '~/utils/theme'
import Select from 'react-select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllCategories } from '~/apis/categories.api'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { subcategorySchema } from '~/schemas/subcategorySchema'
import { createSubcategory } from '~/apis/subcategories.api'
import { toast } from 'sonner'

function AddSubcategory({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  })

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
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
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
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
          {errors.category && <span className='text-red-500 text-sm'>{errors.category.message}</span>}
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
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
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
