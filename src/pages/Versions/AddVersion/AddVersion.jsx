import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { default as SelectSearch } from 'react-select'
import { toast } from 'sonner'
import productsApi from '~/apis/products.api'
import versionApi from '~/apis/version.api'
import Breadcrumb from '~/components/Breadcrumb'
import { path } from '~/constants/path'
import { versionSchema } from '~/schemas/versionSchema'
import { textInputTheme } from '~/utils/theme'

const LIMIT = 100

function AddVersion({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAllProducts({ limit: LIMIT, page: 1 })
  })
  const productOptions = data?.data?.data?.docs.map((product) => {
    return {
      value: product._id,
      label: product.name
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
      product: '',
      old_price: 100,
      current_price: 100,
      is_featured: false,
      status: '',
      description: ''
    },
    resolver: yupResolver(versionSchema)
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

  const { mutateAsync: addVersionMutateAsync, isPending } = useMutation({
    mutationFn: (data) => versionApi.createVersion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['versions'] })
      navigate(path.version)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const configuration = data.description.split('\n')
    toast.promise(addVersionMutateAsync({ ...data, description: configuration }), {
      loading: 'Đang thêm phiên bản sản phẩm...',
      success: 'Thêm phiên bản sản phẩm thành công!',
      error: 'Thêm phiên bản sản phẩm thất bại!'
    })
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thêm phiên bản sản phẩm | Trang quản trị thêm phiên bản sản phẩm</title>
        <meta name='description' content='Trang quản trị | Thêm phiên bản sản phẩm' />
      </Helmet>
      <div className='mx-10 mt-20'>
        <Breadcrumb location='Thêm phiên bản sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Thêm phiên bản sản phẩm</h2>
          <button
            className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 focus:outline-none'
            type='button'
            onClick={() => navigate(path.version)}
          >
            Quay lại
          </button>
        </div>
      </div>
      <form className='mx-10' onSubmit={onSubmit}>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên sản phẩm' />
          </div>
          <TextInput
            theme={textInputTheme}
            id='name'
            type='text'
            placeholder='Vui lòng nhập tên sản phẩm'
            {...register('name')}
            onChange={() => clearErrors('name')}
          />
          {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='product' value='Thuộc dòng sản phẩm' />
          </div>
          <div className='remove-input-txt-border'>
            <SelectSearch
              placeholder='Chọn dòng sản phẩm'
              options={productOptions}
              className='text-sm'
              isClearable
              isSearchable
              {...register('product')}
              onChange={(selectedOption) => {
                if (errors.product) clearErrors('product')
                setValue('product', selectedOption?.value)
              }}
            />
          </div>
          {errors.product && <span className='text-sm text-red-500'>{errors.product.message}</span>}
        </div>
        <div className='flex gap-5'>
          <div className='mb-5 flex-1'>
            <div className='mb-2 block'>
              <Label htmlFor='old_price' value='Giá cũ sản phẩm' />
            </div>
            <TextInput
              theme={textInputTheme}
              id='old_price'
              type='number'
              placeholder='Vui lòng giá cũ sản phẩm'
              {...register('old_price')}
              onChange={() => clearErrors('old_price')}
            />
            {errors.old_price && <span className='text-sm text-red-500'>{errors.old_price.message}</span>}
          </div>
          <div className='mb-5 flex-1'>
            <div className='mb-2 block'>
              <Label htmlFor='current_price' value='Giá mới sản phẩm' />
            </div>
            <TextInput
              theme={textInputTheme}
              id='current_price'
              type='number'
              placehcurrenter='Vui lòng giá mới sản phẩm'
              {...register('current_price')}
              onChange={() => clearErrors('current_price')}
            />
            {errors.current_price && <span className='text-sm text-red-500'>{errors.current_price.message}</span>}
          </div>
        </div>
        <div className='flex items-center gap-2 mb-5'>
          <Checkbox
            id='is_featured'
            {...register('is_featured')}
            onChange={() => clearErrors('is_featured')}
            defaultChecked={false}
          />
          <Label htmlFor='is_featured'>Sản phẩm nổi bật</Label>
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='status' value='Tình trạng hàng' />
          </div>
          <Select theme={textInputTheme} id='status' onChange={() => clearErrors('status')} {...register('status')}>
            <option value='Còn hàng'>Còn hàng</option>
            <option value='Hết hàng'>Hết hàng</option>
          </Select>
          {errors.status && <span className='text-sm text-red-500'>{errors.status.message}</span>}
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='details' value='Thông tin chi tiết' />
          </div>
          <Textarea
            id='details'
            placeholder='Vui lòng nhập thông tin chi tiết'
            required
            rows={8}
            {...register('description')}
            onChange={() => clearErrors('description')}
          />
          {errors.description && <span className='text-sm text-red-500'>{errors.description.message}</span>}
        </div>
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            type='submit'
            gradientMonochrome='cyan'
            isProcessing={isPending}
            disabled={isPending}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddVersion
