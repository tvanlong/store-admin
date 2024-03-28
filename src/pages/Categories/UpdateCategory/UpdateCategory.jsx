import { Button, Label, TextInput } from 'flowbite-react'
import { textInputTheme } from '~/utils/theme'

function UpdateCategory() {
  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Cập nhật danh mục sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để cập nhật danh mục sản phẩm
        </p>
      </div>
      <form className='mx-40'>
        <div className='mb-2 block'>
          <Label htmlFor='name' value='Tên danh mục sản phẩm' />
        </div>
        <TextInput theme={textInputTheme} id='name' type='text' placeholder='Vui lòng nhập tên danh mục sản phẩm' />
        <div className='flex justify-center'>
          <Button className='mt-10' gradientMonochrome='cyan'>
            Cập nhật danh mục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCategory
