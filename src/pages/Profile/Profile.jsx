import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tabs } from 'flowbite-react'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'
import { toast } from 'sonner'
import imagesApi from '~/apis/images.api'
import otpApi from '~/apis/otp.api'
import usersApi from '~/apis/users.api'
import { DEFAULT_AVATAR } from '~/constants/default'
import { AppContext } from '~/context/app.context'
import { changeEmailSchema, changePasswordSchema, profileSchema } from '~/schemas/userSchema'
import { setProfileToLS } from '~/utils/auth'
import { tabsTheme } from '~/utils/theme'
import { extractPublicIdFromUrl } from '~/utils/util'

function Profile({ setProgress }) {
  const { isAuthenticated, profile, setProfile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [file, setFile] = useState(null)
  const { data: userData } = useQuery({
    queryKey: ['profile', profile?._id],
    queryFn: () => usersApi.getStaff(profile?._id),
    enabled: isAuthenticated && !!profile?._id
  })
  const user = useMemo(() => userData?.data?.data || {}, [userData])
  const [showPassword, setShowPassword] = useState(false)
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = useRef(null)
  const [otp, setOtp] = useState('')
  const [isVerify, setIsVerify] = useState(false)

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const {
    register: registerProfile,
    setValue: setValueProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    clearErrors: clearErrorsProfile
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register: registerPassword,
    setValue: setValuePassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    clearErrors: clearErrorsPassword
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const {
    register: registerEmail,
    setValue: setValueEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
    clearErrors: clearErrorsEmail,
    getValues: getEmailValues
  } = useForm({
    defaultValues: {
      email: '',
      new_email: ''
    },
    resolver: yupResolver(changeEmailSchema)
  })

  useEffect(() => {
    if (user) {
      setValueProfile('name', user.name)
      setValueProfile('email', user.email)
      setValueProfile('phone', user.phone)
    }
  }, [user, setValueProfile])

  useEffect(() => {
    setValueEmail('email', user.email)
  }, [user.email, setValueEmail])

  const { mutateAsync: updateProfileMutate, isPending } = useMutation({
    mutationFn: (data) => usersApi.updateProfile(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile?._id] })
    }
  })

  const { mutateAsync: uploadAvatarMutate } = useMutation({
    mutationFn: (data) => imagesApi.uploadAvatar(profile?._id, data)
  })

  const { mutateAsync: deleteImageMutate } = useMutation({
    mutationFn: (public_id) => imagesApi.deleteImage(public_id)
  })

  const { mutateAsync: changePasswordMutate, isPending: isPendingPassword } = useMutation({
    mutationFn: (data) => usersApi.changePassword(profile?._id, data)
  })

  const { mutateAsync: changeEmailMutate } = useMutation({
    mutationFn: (data) => otpApi.changeEmail(profile?._id, data)
  })

  const { mutateAsync: verifyEmailMutate } = useMutation({
    mutationFn: (data) => otpApi.verifyEmail(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile?._id] })
    }
  })

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

  const handleChangeInputProfile = (e) => {
    setValueProfile(e.target.name, e.target.value)
    if (errorsProfile[e.target.name]) {
      clearErrorsProfile(e.target.name)
    }
  }

  const handleChangeInputPassword = (e) => {
    setValuePassword(e.target.name, e.target.value)
    if (errorsPassword[e.target.name]) {
      clearErrorsPassword(e.target.name)
    }
  }

  const handleChangeInputEmail = (e) => {
    setValueEmail(e.target.name, e.target.value)
    if (errorsEmail[e.target.name]) {
      clearErrorsEmail(e.target.name)
    }
  }

  const onSubmitProfile = handleSubmitProfile(async (data) => {
    const toastId = toast.loading('Đang cập nhật thông tin...')
    try {
      if (profile?.avatar !== DEFAULT_AVATAR) {
        await deleteImageMutate(extractPublicIdFromUrl(profile?.avatar))
      }

      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)
        await uploadAvatarMutate(formData)

        const res = await updateProfileMutate(data)
        setProfile(res.data.data)
        setProfileToLS(res.data.data)
      } else {
        const res = await updateProfileMutate(data)
        setProfile(res.data.data)
        setProfileToLS(res.data.data)
      }
      toast.success('Cập nhật thông tin thành công', { id: toastId })
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại', { id: toastId })
    }
  })

  const onSubmitPassword = handleSubmitPassword((data) => {
    toast.promise(changePasswordMutate(data), {
      loading: 'Đang cập nhật mật khẩu...',
      success: (response) => {
        return response?.data?.message || 'Cập nhật mật khẩu thành công'
      },
      error: (err) => {
        return err?.response?.data?.message || 'Cập nhật mật khẩu thất bại'
      }
    })
  })

  const onSubmitEmail = handleSubmitEmail(async (data) => {
    const toastId = toast.loading('Đang cập nhật thông tin...')
    try {
      const response = await changeEmailMutate(data)
      if (response.data) {
        setIsVerify(true)
        toast.success(response.data.message || 'Vui lòng kiểm tra email của bạn để xác nhận thay đổi email!', {
          id: toastId
        })
      }
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại', { id: toastId })
    }
  })

  const handleVerifyEmail = async () => {
    const toastId = toast.loading('Đang xác nhận email...')
    try {
      const email = getEmailValues('new_email')
      const response = await verifyEmailMutate({ email, otp })
      if (response.data) {
        toast.success(response.data.message || 'Xác nhận thay đổi email thành công', { id: toastId })
        setIsVerify(false)
        setProfile(response.data.data)
        setProfileToLS(response.data.data)
      }
    } catch (error) {
      toast.error('Xác nhận email thất bại', { id: toastId })
    }
  }

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Thông tin tài khoản | Trang quản trị cập nhật thông tin tài khoản</title>
        <meta name='description' content='Trang quản trị | Cập nhật thông tin tài khoản' />
      </Helmet>
      <Tabs
        theme={tabsTheme}
        className='flex justify-center border-none'
        aria-label='Tabs with underline'
        style='underline'
      >
        <Tabs.Item active title='Thông tin cá nhân' icon={HiUserCircle}>
          <h2 className='mb-6 mt-10 text-center text-2xl font-semibold'>Thông tin cá nhân</h2>
          <p className='mb-6 text-center text-sm text-gray-500'>Thay đổi thông tin cá nhân của bạn tại đây</p>
          <form className='mx-40' onSubmit={onSubmitProfile}>
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
                    {...registerProfile('name')}
                    onChange={(e) => handleChangeInputProfile(e)}
                  />
                  {errorsProfile.name && <span className='text-sm text-red-500'>{errorsProfile.name.message}</span>}
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
                    {...registerProfile('email')}
                  />
                  {errorsProfile.email && <span className='text-sm text-red-500'>{errorsProfile.email.message}</span>}
                </div>
                <div className='mb-6'>
                  <label htmlFor='cus_phone' className='mb-2 block text-sm font-medium text-gray-900'>
                    Số điện thoại
                  </label>
                  <input
                    type='phone'
                    id='cus_phone'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    {...registerProfile('phone')}
                  />
                  {errorsProfile.phone && <span className='text-sm text-red-500'>{errorsProfile.phone.message}</span>}
                </div>
              </div>
              <div className='col-span-2'>
                <div className='flex justify-center md:w-72'>
                  <div className='flex flex-col items-center'>
                    <div className='my-5 h-24 w-24'>
                      <img
                        src={previewImage || user?.avatar || DEFAULT_AVATAR}
                        alt=''
                        className='h-full w-full rounded-full object-cover border border-gray-300'
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
              disabled={isPending}
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
            >
              Cập nhật lại thông tin
            </button>
          </form>
        </Tabs.Item>
        <Tabs.Item title='Đổi email xác thực' icon={MdDashboard}>
          <h2 className='mb-6 text-center text-2xl font-semibold'>Thay đổi địa chỉ email xác thực</h2>
          <p className='mb-6 text-center text-sm text-gray-500'>
            Thay đổi địa chỉ email xác thực để bảo mật tài khoản của bạn
          </p>
          <form className='mx-40' onSubmit={onSubmitEmail}>
            <div className='mb-6'>
              <label htmlFor='current_email' className='mb-2 block text-sm font-medium text-gray-900'>
                Địa chỉ email hiện tại
              </label>
              <input
                id='current_email'
                disabled
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                {...registerEmail('email')}
                onChange={(e) => handleChangeInputEmail(e)}
              />
            </div>
            {errorsEmail.email && <p className='text-red-500 text-sm'>{errorsEmail.email.message}</p>}
            <div className='mb-6'>
              <label htmlFor='new_email' className='mb-2 block text-sm font-medium text-gray-900'>
                Địa chỉ email mới
              </label>
              <input
                id='new_email'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                {...registerEmail('new_email')}
                onChange={(e) => handleChangeInputEmail(e)}
              />
            </div>
            {errorsEmail.new_email && <p className='text-red-500 text-sm'>{errorsEmail.new_email.message}</p>}
            {isVerify && (
              <div className='mb-6'>
                <label htmlFor='otp' className='mb-2 block text-sm font-medium text-gray-900'>
                  Mã OTP
                </label>
                <input
                  id='otp'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {!isVerify && (
              <div className='text-center'>
                <button
                  type='submit'
                  disabled={isPendingPassword}
                  className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800'
                >
                  Thay đổi email
                </button>
              </div>
            )}
            {isVerify && (
              <button
                type='button'
                onClick={handleVerifyEmail}
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800'
              >
                Xác nhận thay đổi email
              </button>
            )}
          </form>
        </Tabs.Item>
        <Tabs.Item title='Đổi mật khẩu' icon={MdDashboard}>
          <h2 className='mb-6 text-center text-2xl font-semibold'>Thay đổi mật khẩu</h2>
          <p className='mb-6 text-center text-sm text-gray-500'>
            Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu với người khác
          </p>
          <form className='mx-40' onSubmit={onSubmitPassword}>
            <div className='mb-6'>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900'>
                Mật khẩu mới
              </label>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                {...registerPassword('password')}
                onChange={(e) => handleChangeInputPassword(e)}
              />
              {errorsPassword.password && (
                <span className='text-sm text-red-500'>{errorsPassword.password.message}</span>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor='password_confirmation' className='mb-2 block text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                id='password_confirmation'
                type={showPassword ? 'text' : 'password'}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                {...registerPassword('confirm_password')}
                onChange={(e) => handleChangeInputPassword(e)}
              />
              {errorsPassword.confirm_password && (
                <span className='text-sm text-red-500'>{errorsPassword.confirm_password.message}</span>
              )}
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
                disabled={isPendingPassword}
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800'
              >
                Cập nhật lại thông tin
              </button>
            </div>
          </form>
        </Tabs.Item>
        <Tabs.Item title='Liên hệ' icon={HiClipboardList}>
          <section className='bg-white'>
            <div className='mx-auto max-w-screen-lg px-4 py-8 lg:py-16'>
              <h2 className='mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900'>
                Liên hệ với chúng tôi
              </h2>
              <p className='mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16'>
                Đừng ngần ngại liên hệ với chúng tôi nếu bạn cần hỗ trợ hoặc có bất kỳ câu hỏi nào
              </p>
              <form className='space-y-8'>
                <div>
                  <label htmlFor='email_contact' className='mb-2 block text-sm font-medium text-gray-900'>
                    Địa chỉ email
                  </label>
                  <input
                    type='email'
                    id='email_contact'
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
      </Tabs>
    </div>
  )
}

export default Profile
