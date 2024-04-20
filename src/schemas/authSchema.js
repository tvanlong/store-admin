import * as yup from 'yup'

export const signInSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu không được để trống')
})
