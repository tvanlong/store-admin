import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import Select from 'react-select'
import { useEffect, useMemo, useState } from 'react'
import { getAllSubcategories } from '~/apis/subcategories.api'
import { fileInputTheme, textInputTheme } from '~/utils/theme'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productUpdateSchema } from '~/schemas/productSchema'
import { deleteImage, uploadImages } from '~/apis/images.api'
import { getProduct, updateProduct } from '~/apis/products.api'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import config from '~/constants/config'
import { Helmet } from 'react-helmet-async'

function UpdateProduct({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const [file, setFile] = useState([])
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
  })
  const { data } = useQuery({
    queryKey: ['subcategories'],
    queryFn: getAllSubcategories
  })
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
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const previewImage = useMemo(() => {
    if (file.length > 0) {
      return file.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt='preview'
          className='w-20 h-20 object-cover rounded-lg border border-gray-300'
        />
      ))
    } else if (productData?.data?.data) {
      return productData?.data?.data.images.map((image, index) => (
        <img
          key={index}
          src={`${config.baseURL}/api/upload/${image}`}
          alt={productData?.data?.data.name}
          className='w-20 h-20 object-cover rounded-lg border border-gray-300'
        />
      ))
    }
    return null
  }, [file, productData?.data?.data])

  const { mutateAsync: uploadImagesMutateAsync } = useMutation({
    mutationFn: (data) => uploadImages(data)
  })

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (name) => deleteImage(name)
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
      productData?.data?.data.images.forEach(async (image) => {
        await deleteImageMutateAsync(image)
      })
      const fileList = Array.from(data.images)
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('files', file)
      })
      const response = await uploadImagesMutateAsync(formData)
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
    <div className='mt-[68px] h-full'>
      <Helmet>
        <title>Cập nhật sản phẩm | Trang quản trị cập nhật sản phẩm</title>
        <meta name='description' content='Trang quản trị | Cập nhật sản phẩm' />
      </Helmet>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
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
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
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
          {errors.images && <span className='text-red-500 text-sm'>{errors.images.message}</span>}
        </div>
        <div className='flex gap-3 mb-5'>{previewImage}</div>
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
          {errors.subcategory && <span className='text-red-500 text-sm'>{errors.subcategory.message}</span>}
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
