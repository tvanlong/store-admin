import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import Select from 'react-select'
import { useEffect, useMemo, useState } from 'react'
import { fileInputTheme, textInputTheme } from '~/utils/theme'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productSchema } from '~/schemas/productSchema'
import { deleteImage, uploadImages } from '~/apis/images.api'
import { addProduct } from '~/apis/products.api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useSubcategories } from '~/hooks/useSubcategories'

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
          className='w-20 h-20 object-cover rounded-lg border border-gray-300'
        />
      )
    return file.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt='preview'
        className='w-20 h-20 object-cover rounded-lg border border-gray-300'
      />
    ))
  }, [file])

  const { mutateAsync: uploadImagesMutateAsync } = useMutation({
    mutationFn: (data) => uploadImages(data)
  })

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (name) => deleteImage(name)
  })

  const { mutateAsync: addProductMutateAsync, isPending } = useMutation({
    mutationFn: (data) => addProduct(data),
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
    const fileList = Array.from(data.images)
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files', file)
    })
    const response = await uploadImagesMutateAsync(formData)
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
    <div className='mt-[68px] h-full'>
      <Helmet>
        <title>Thêm sản phẩm | Trang quản trị thêm sản phẩm mới</title>
        <meta name='description' content='Trang quản trị | Thêm sản phẩm mới' />
      </Helmet>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
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
            Thêm sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
