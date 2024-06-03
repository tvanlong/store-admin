import { Tabs } from 'flowbite-react'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'
import { toast } from 'sonner'
import { AppContext } from '~/context/app.context'

function Profile({ setProgress }) {
  const { profile } = useContext(AppContext)
  const [file, setFile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = useRef(null)

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const handleChangeFile = (event) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= 1048576 || !fileFromLocal.type.includes('image'))) {
      toast.error(
        `Dung lượng file tối đa 1 MB
      Định dạng: .JPEG, .PNG`
      )
    } else {
      setFile(fileFromLocal)
    }
  }

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thông tin tài khoản | Trang quản trị cập nhật thông tin tài khoản</title>
        <meta name='description' content='Trang quản trị | Cập nhật thông tin tài khoản' />
      </Helmet>
      <Tabs className='flex justify-center border-none' aria-label='Tabs with underline' style='underline'>
        <Tabs.Item active title='Thông tin cá nhân' icon={HiUserCircle}>
          <h2 className='mb-6 mt-10 text-center text-2xl font-semibold'>Thông tin cá nhân</h2>
          <p className='mb-6 text-center text-sm text-gray-500'>Thay đổi thông tin cá nhân của bạn tại đây</p>
          <form className='mx-40'>
            <div className='mt-6 grid grid-cols-5 gap-4'>
              <div className='col-span-3 mr-12'>
                <div className='mb-6'>
                  <label htmlFor='cus_name' className='mb-2 block text-sm font-medium text-gray-900'>
                    Tên nhân viên
                  </label>
                  <input
                    type='text'
                    id='cus_name'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                  />
                </div>
                <div className='mb-6'>
                  <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
                    Địa chỉ email
                  </label>
                  <input
                    type='text'
                    id='email'
                    disabled
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                  />
                </div>
                <div className='mb-6'>
                  <label htmlFor='cus_phone' className='mb-2 block text-sm font-medium text-gray-900'>
                    Số điện thoại
                  </label>
                  <input
                    type='text'
                    id='cus_phone'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                  />
                </div>
              </div>
              <div className='col-span-2'>
                <div className='flex justify-center md:w-72'>
                  <div className='flex flex-col items-center'>
                    <div className='my-5 h-24 w-24'>
                      <img
                        src={profile?.avatar || previewImage}
                        alt=''
                        className='h-full w-full rounded-full object-cover'
                      />
                    </div>
                    <input
                      className='hidden'
                      type='file'
                      accept='.jpg,.jpeg,.png'
                      ref={fileInputRef}
                      onChange={(event) => handleChangeFile(event)}
                    />
                    <button
                      type='button'
                      onClick={() => fileInputRef.current.click()}
                      className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                    >
                      Chọn ảnh
                    </button>
                    <div className='mt-3 text-sm text-gray-400'>
                      <div>Dung lượng file tối đa 1 MB</div>
                      <div>Định dạng: .JPEG, .PNG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
            >
              Cập nhật lại thông tin
            </button>
          </form>
        </Tabs.Item>
        <Tabs.Item title='Đổi mật khẩu' icon={MdDashboard}>
          <h2 className='mb-6 text-center text-2xl font-semibold'>Thay đổi mật khẩu</h2>
          <p className='mb-6 text-center text-sm text-gray-500'>
            Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu với người khác
          </p>
          <form className='mx-40'>
            <div className='mb-6'>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900'>
                Mật khẩu mới
              </label>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password_confirmation' className='mb-2 block text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                id='password_confirmation'
                type={showPassword ? 'text' : 'password'}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              />
            </div>
            <label className='mb-5 flex cursor-pointer items-center'>
              <input
                type='checkbox'
                value=''
                className='peer sr-only'
                onChange={() => setShowPassword(!showPassword)}
              />
              <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
              <span className='ms-3 text-sm font-medium text-gray-900'>Hiển thị mật khẩu</span>
            </label>
            <div className='text-center'>
              <button
                type='submit'
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800'
              >
                Cập nhật lại thông tin
              </button>
            </div>
          </form>
        </Tabs.Item>
        <Tabs.Item title='Cài đặt' icon={HiAdjustments}></Tabs.Item>
        <Tabs.Item title='Liên hệ' icon={HiClipboardList}>
          <section className='bg-white'>
            <div className='mx-auto max-w-screen-lg px-4 py-8 lg:py-16'>
              <h2 className='mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900'>
                Liên hệ với chúng tôi
              </h2>
              <p className='mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16'>
                Đừng ngần ngại liên hệ với chúng tôi nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào
              </p>
              <form action='#' className='space-y-8'>
                <div>
                  <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
                    Địa chỉ email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    placeholder='Nhập địa chỉ email'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='subject' className='mb-2 block text-sm font-medium text-gray-900'>
                    Chủ đề
                  </label>
                  <input
                    type='text'
                    id='subject'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm'
                    placeholder='Nhập chủ đề'
                    required
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label htmlFor='message' className='mb-2 block text-sm font-medium text-gray-900'>
                    Nội dung
                  </label>
                  <textarea
                    id='message'
                    rows='6'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    placeholder='Nhập nội dung'
                  ></textarea>
                </div>
                <div className='text-center'>
                  <button
                    type='submit'
                    className='bg-primary-700 rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 sm:w-fit'
                  >
                    Gửi thông tin
                  </button>
                </div>
              </form>
            </div>
          </section>
        </Tabs.Item>
        <Tabs.Item disabled title='Coming soon'></Tabs.Item>
      </Tabs>
    </div>
  )
}

export default Profile
