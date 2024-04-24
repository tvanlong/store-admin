import * as yup from 'yup'

export const categorySchema = yup.object({
  name: yup.string().min(6, 'Tên danh mục phải có ít nhất 6 ký tự').required('Tên danh mục không được để trống')
})
