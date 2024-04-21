import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { textInputTheme } from '~/utils/theme'

function UpdateStaff({ setProgress }) {
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
            Cập nhật nhân viên
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Điền thông tin vào form dưới đây để cập nhật nhân viên
        </p>
      </div>
      <form className='grid grid-cols-2 gap-10 mx-10'>
        <div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='name' value='Tên khách hàng' />
            </div>
            <TextInput theme={textInputTheme} id='name' type='text' placeholder='Vui lòng nhập tên khách hàng' />
          </div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='email' value='Email khách hàng' />
            </div>
            <TextInput theme={textInputTheme} id='email' type='email' placeholder='Vui lòng nhập email khách hàng' />
          </div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='phone' value='SĐT khách hàng' />
            </div>
            <TextInput theme={textInputTheme} id='phone' type='text' placeholder='Vui lòng nhập SĐT khách hàng' />
          </div>
        </div>
        <div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='address' value='Địa chỉ khách hàng' />
            </div>
            <TextInput theme={textInputTheme} id='address' type='text' placeholder='Vui lòng nhập dịa chỉ khách hàng' />
          </div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='password' value='Mật khẩu' />
            </div>
            <TextInput theme={textInputTheme} id='password' type='password' placeholder='Mật khẩu' />
          </div>
          <div className='mb-5'>
            <div className='mb-2 block'>
              <Label htmlFor='confirm-password' value='Xác nhận mật khẩu' />
            </div>
            <TextInput theme={textInputTheme} id='confirm-password' type='password' placeholder='Xác nhận mật khẩu' />
          </div>
        </div>
        <div className='col-span-2'>
          <div className='flex justify-center'>
            <Button className='mt-10' gradientMonochrome='cyan'>
              Cập nhật nhân viên
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateStaff
