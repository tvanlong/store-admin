import * as yup from 'yup'

export const staffSchema = yup.object({
  name: yup.string().min(6, 'Tên nhân viên phải có ít nhất 6 ký tự').required('Tên nhân viên không được để trống'),
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  phone: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký').required('Mật khẩu không được để trống'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Mật khẩu không được để trống')
})
