import { Button, FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useMemo, useState } from 'react'
import { fileInputTheme, textInputTheme } from '~/utils/theme'

function UpdateProduct() {
  const [file, setFile] = useState([])

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

  const handleFileChange = (files) => {
    const fileList = Array.from(files)
    setFile(fileList)
  }

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Cập nhật sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để cập nhật sản phẩm mới
        </p>
      </div>
      <form className='mx-40'>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên sản phẩm' />
          </div>
          <TextInput theme={textInputTheme} id='name' type='text' placeholder='Vui lòng nhập tên sản phẩm' />
        </div>
        <div id='fileUpload' className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='file' value='Upload file' />
          </div>
          <FileInput
            theme={fileInputTheme}
            id='file'
            helperText={file.length === 0 ? 'Chọn ảnh sản phẩm để upload' : 'Ảnh đã được chọn'}
            onChange={(e) => handleFileChange(e.target.files)}
            multiple
          />
        </div>
        <div className='flex gap-3 mb-5'>{previewImage}</div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='category-name' value='Thuộc danh mục sản phẩm' />
          </div>
          <Select theme={textInputTheme} id='category-name'>
            <option>Laptop Dell</option>
            <option>Laptop HP</option>
          </Select>
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='config' value='Tên cấu hình sản phẩm' />
          </div>
          <TextInput theme={textInputTheme} id='config' type='text' placeholder='Vui lòng nhập tên cấu hình sản phẩm' />
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='price' value='Giá gốc sản phẩm' />
          </div>
          <TextInput theme={textInputTheme} id='price' type='number' placeholder='Vui lòng nhập giá gốc sản phẩm' />
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='discount' value='Giảm giá sản phẩm' />
          </div>
          <TextInput theme={textInputTheme} id='discount' type='number' placeholder='Vui lòng nhập giảm giá sản phẩm' />
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='status' value='Tình trạng hàng' />
          </div>
          <Select theme={textInputTheme} id='status'>
            <option>Còn hàng</option>
            <option>Hết hàng</option>
          </Select>
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='details' value='Thông tin chi tiết' />
          </div>
          <Textarea id='details' placeholder='Vui lòng nhập thông tin chi tiết' required rows={8} />
        </div>
        <div className='flex justify-center'>
          <Button className='mt-10' gradientMonochrome='cyan'>
            Cập nhật sản phẩm
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
