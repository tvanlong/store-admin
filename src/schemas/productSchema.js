import * as yup from 'yup'

export const productSchema = yup.object({
  name: yup.string().min(3, 'Tên danh mục phải có ít nhất 3 ký tự').required('Tên danh mục không được để trống'),
  subcategory: yup.string().required('Danh mục sản phẩm không được để trống')
})
