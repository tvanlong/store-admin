import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import Select from 'react-select'
import { useEffect, useMemo, useState } from 'react'
import { fileInputTheme, textInputTheme } from '~/utils/theme'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productUpdateSchema } from '~/schemas/productSchema'
import { deleteImage, uploadImages } from '~/apis/images.api'
import { getProduct, updateProduct } from '~/apis/products.api'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useSubcategories } from '~/hooks/useSubcategories'
import { extractPublicIdFromUrl } from '~/utils/util'

function UpdateProduct({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const [file, setFile] = useState([])
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
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

  const { mutateAsync: uploadImagesMutateAsync } = useMutation({
    mutationFn: (data) => uploadImages(data)
  })

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (public_id) => deleteImage(public_id)
  })

  const { mutateAsync: updateProductMutateAsync, isPending } = useMutation({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/product')
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
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Cập nhật sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để cập nhật dòng sản phẩm
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
            isProcessing={isPending}
            disabled={isPending}
          >
            Cập nhật sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
