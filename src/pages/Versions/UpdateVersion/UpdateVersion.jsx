import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { default as SelectSearch } from 'react-select'
import { toast } from 'sonner'
import productsApi from '~/apis/products.api'
import versionApi from '~/apis/version.api'
import { path } from '~/constants/path'
import { versionSchema } from '~/schemas/versionSchema'
import { textInputTheme } from '~/utils/theme'

const LIMIT = 100

function UpdateVersion({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: versionData } = useQuery({
    queryKey: ['version', id],
    queryFn: () => versionApi.getVersionById(id)
  })
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
    clearErrors,
    watch
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

  useEffect(() => {
    const version = versionData?.data?.data
    if (version) {
      setValue('name', version.name)
      setValue('product', version.product._id)
      setValue('old_price', version.old_price)
      setValue('current_price', version.current_price)
      setValue('is_featured', version.is_featured)
      setValue('status', version.status)
      setValue('description', version.description.join('\n'))
    }
  }, [versionData, setValue])

  const { mutateAsync: updateVersionMutateAsync, isPending } = useMutation({
    mutationFn: (data) => versionApi.updateVersion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['versions'] })
      queryClient.invalidateQueries({ queryKey: ['version', id] })
      navigate(path.version)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const configuration = data.description.split('\n')
    toast.promise(updateVersionMutateAsync({ ...data, description: configuration }), {
      loading: 'Đang cập nhật phiên bản sản phẩm...',
      success: 'Cập nhật phiên bản sản phẩm thành công!',
      error: 'Cập nhật phiên bản sản phẩm thất bại!'
    })
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Cập nhật phiên bản sản phẩm | Trang quản trị cập nhật phiên bản sản phẩm</title>
        <meta name='description' content='Trang quản trị | Cập nhật phiên bản sản phẩm' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Cập nhật phiên bản sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để cập nhật phiên bản sản phẩm
        </p>
      </div>
      <form className='mx-40' onSubmit={onSubmit}>
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
              value={productOptions ? productOptions.find((option) => option.value === watch('product')) : null}
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
            defaultChecked={watch('is_featured')}
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
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateVersion
