import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { textInputTheme } from '~/utils/theme'

function AddCategory({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Thêm danh mục sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để thêm danh mục sản phẩm mới
        </p>
      </div>
      <form className='mx-40'>
        <div className='mb-2 block'>
          <Label htmlFor='name' value='Tên danh mục sản phẩm' />
        </div>
        <TextInput theme={textInputTheme} id='name' type='text' placeholder='Vui lòng nhập tên danh mục sản phẩm' />
        <div className='flex justify-center'>
          <Button className='mt-10' gradientMonochrome='cyan'>
            Thêm danh mục
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
