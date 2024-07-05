import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb, Button, FileInput, Label, TextInput } from 'flowbite-react'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'sonner'
import imagesApi from '~/apis/images.api'
import productsApi from '~/apis/products.api'
import { path } from '~/constants/path'
import { useSubcategories } from '~/hooks/useSubcategories'
import { productUpdateSchema } from '~/schemas/productSchema'
import { fileInputTheme, textInputTheme } from '~/utils/theme'
import { extractPublicIdFromUrl } from '~/utils/util'

function UpdateProduct({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const [file, setFile] = useState([])
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id)
  })
  const { data } = useSubcategories()
  const subcategoryOptions = data?.data?.data.map((subcategory) => {
    return {
      value: subcategory._id,
      label: subcategory.name
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
      subcategory: ''
    },
    resolver: yupResolver(productUpdateSchema)
  })

  useEffect(() => {
    const product = productData?.data?.data
    if (product) {
      setValue('name', product.name)
      setValue('subcategory', product.subcategory._id)
    }
  }, [productData, setValue])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const previewImage = useMemo(() => {
    if (file.length > 0) {
      return file.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt='preview'
          className='h-20 w-20 rounded-lg border border-gray-300 object-cover'
        />
      ))
    } else if (productData?.data?.data) {
      return productData?.data?.data.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={productData?.data?.data.name}
          className='h-20 w-20 rounded-lg border border-gray-300 object-cover'
        />
      ))
    }
    return null
  }, [file, productData?.data?.data])

  const { mutateAsync: uploadImagesMutateAsync, isPending: isUploadImagesPending } = useMutation({
    mutationFn: (data) => imagesApi.uploadImages(data)
  })

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (public_id) => imagesApi.deleteImage(public_id)
  })

  const { mutateAsync: updateProductMutateAsync, isPending: isUpdateProductPending } = useMutation({
    mutationFn: (data) => productsApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })
      navigate(path.product)
    }
  })

  const handleFileChange = (files) => {
    if (errors.images) clearErrors('images')
    const fileList = Array.from(files)
    setFile(fileList)
  }

  const onSubmit = handleSubmit(async (data) => {
    if (file.length > 0) {
      const toastId = toast.loading('Đang upload ảnh sản phẩm...')
      productData?.data?.data.images.forEach(async (image) => {
        const public_id = extractPublicIdFromUrl(image)
        await deleteImageMutateAsync(public_id)
      })
      const fileList = Array.from(data.images)
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('files', file)
      })

      const response = await uploadImagesMutateAsync(formData)
      toast.dismiss(toastId)

      toast.promise(updateProductMutateAsync({ ...data, images: response.data.files }), {
        loading: 'Đang cập nhật sản phẩm...',
        success: 'Cập nhật sản phẩm thành công',
        error: 'Cập nhật sản phẩm thất bại'
      })
    } else {
      toast.promise(updateProductMutateAsync({ ...data, images: productData?.data?.data.images }), {
        loading: 'Đang cập nhật sản phẩm...',
        success: 'Cập nhật sản phẩm thành công',
        error: 'Cập nhật sản phẩm thất bại'
      })
    }
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Cập nhật sản phẩm | Trang quản trị cập nhật sản phẩm</title>
        <meta name='description' content='Trang quản trị | Cập nhật sản phẩm' />
      </Helmet>
      <div className='mx-10 mt-20'>
        <Breadcrumb location='Cập nhật dòng sản phẩm' />
        <div className='flex justify-between'>
          <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Cập nhật dòng sản phẩm</h2>
          <button
            className='text-white h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 focus:outline-none'
            type='button'
            onClick={() => navigate(path.product)}
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
        <div id='fileUpload' className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Upload file' />
          </div>
          <FileInput
            theme={fileInputTheme}
            id='file'
            helperText={file.length === 0 ? 'Chọn ảnh sản phẩm để upload' : 'Ảnh đã được chọn'}
            multiple
            {...register('images')}
            onChange={(e) => handleFileChange(e.target.files)}
          />
          {errors.images && <span className='text-sm text-red-500'>{errors.images.message}</span>}
        </div>
        <div className='mb-5 flex gap-3'>{previewImage}</div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='subcategory' value='Thuộc danh mục sản phẩm' />
          </div>
          <div className='remove-input-txt-border'>
            <Select
              placeholder='Chọn danh mục sản phẩm'
              options={subcategoryOptions}
              className='text-sm'
              isClearable
              isSearchable
              {...register('subcategory')}
              value={
                subcategoryOptions ? subcategoryOptions.find((option) => option.value === watch('subcategory')) : null
              }
              onChange={(selectedOption) => {
                if (errors.subcategory) clearErrors('subcategory')
                setValue('subcategory', selectedOption?.value)
              }}
            />
          </div>
          {errors.subcategory && <span className='text-sm text-red-500'>{errors.subcategory.message}</span>}
        </div>
        <div className='flex justify-center'>
          <Button
            className='mt-10'
            type='submit'
            gradientMonochrome='cyan'
            isProcessing={isUploadImagesPending || isUpdateProductPending}
            disabled={isUploadImagesPending || isUpdateProductPending}
          >
            Cập nhật sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
