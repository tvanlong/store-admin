import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'sonner'
import imagesApi from '~/apis/images.api'
import productsApi from '~/apis/products.api'
import { useSubcategories } from '~/hooks/useSubcategories'
import { productSchema } from '~/schemas/productSchema'
import { fileInputTheme, textInputTheme } from '~/utils/theme'

function AddProduct({ setProgress }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [file, setFile] = useState([])
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
    clearErrors
  } = useForm({
    defaultValues: {
      name: '',
      subcategory: ''
    },
    resolver: yupResolver(productSchema)
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

  const previewImage = useMemo(() => {
    if (file.length === 0)
      return (
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
          alt='preview'
          className='h-20 w-20 rounded-lg border border-gray-300 object-cover'
        />
      )
    return file.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt='preview'
        className='h-20 w-20 rounded-lg border border-gray-300 object-cover'
      />
    ))
  }, [file])

  const { mutateAsync: uploadImagesMutateAsync } = useMutation({
    mutationFn: (data) => imagesApi.uploadImages(data)
  })

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (name) => imagesApi.deleteImage(name)
  })

  const { mutateAsync: addProductMutateAsync, isPending } = useMutation({
    mutationFn: (data) => productsApi.addProduct(data),
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
    const toastId = toast.loading('Đang upload ảnh...')
    const fileList = Array.from(data.images)
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files', file)
    })

    const response = await uploadImagesMutateAsync(formData)
    toast.dismiss(toastId)

    toast.promise(addProductMutateAsync({ ...data, images: response.data.files }), {
      loading: 'Đang thêm sản phẩm...',
      success: 'Thêm sản phẩm thành công',
      error: (err) => {
        response.data.files.forEach((file) => {
          deleteImageMutateAsync(file)
        })
        return err.response.data.message || 'Có lỗi xảy ra khi thêm sản phẩm'
      }
    })
  })

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thêm sản phẩm | Trang quản trị thêm sản phẩm mới</title>
        <meta name='description' content='Trang quản trị | Thêm sản phẩm mới' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Thêm dòng sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để thêm dòng sản phẩm mới
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
            Thêm sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
