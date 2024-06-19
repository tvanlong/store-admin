import * as yup from 'yup'

export const versionSchema = yup.object({
  name: yup.string().min(3, 'Tên danh mục phải có ít nhất 3 ký tự').required('Tên danh mục không được để trống'),
  product: yup.string().required('Danh mục sản phẩm không được để trống'),
  old_price: yup.number().min(100, 'Giá cũ sản phẩm phải lớn hơn 100').required('Giá cũ sản phẩm không được để trống'),
  current_price: yup
    .number()
    .min(100, 'Giá mới sản phẩm phải lớn hơn 100')
    .required('Giá mới sản phẩm không được để trống'),
  is_featured: yup.boolean().required('Trạng thái sản phẩm không được để trống'),
  status: yup.string().required('Tình trạng sản phẩm không được để trống'),
  description: yup
    .string()
    .min(10, 'Mô tả sản phẩm phải có ít nhất 10 ký tự')
    .required('Mô tả sản phẩm không được để trống')
})
