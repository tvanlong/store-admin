import { Button, Label, Select, TextInput } from 'flowbite-react'

function UpdateSubcategory() {
  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Cập nhật danh mục sản phẩm nhỏ
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>
          Điền thông tin vào form dưới đây để cập nhật danh mục sản phẩm nhỏ
        </p>
      </div>
      <form className='mx-40'>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='category-name' value='Thuộc danh mục sản phẩm' />
          </div>
          <Select id='category-name' required>
            <option>Laptop Dell</option>
            <option>Laptop HP</option>
          </Select>
        </div>
        <div className='mb-5'>
          <div className='mb-2 block'>
            <Label htmlFor='name' value='Tên danh mục sản phẩm' />
          </div>
          <TextInput id='name' type='text' placeholder='Vui lòng nhập tên danh mục sản phẩm' />
        </div>
        <div className='flex justify-center'>
          <Button className='mt-10' gradientMonochrome='cyan'>
            Cập nhật danh mục nhỏ
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateSubcategory
