import * as yup from 'yup'

export const productSchema = yup.object({
  name: yup.string().min(3, 'Tên danh mục phải có ít nhất 3 ký tự').required('Tên danh mục không được để trống'),
  subcategory: yup.string().required('Danh mục sản phẩm không được để trống'),
  images: yup
    .mixed()
    .test('fileSize', 'File Size is too large', (value) => {
      if (value && value?.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 5242880) {
            return false
          }
        }
      }
      return true
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].type != 'image/png' && value[i].type != 'image/jpg' && value[i].type != 'image/jpeg') {
            return false
          }
        }
      }
      return true
    })
    .test('fileLength', 'Chỉ được chọn tối đa 5 ảnh', (value) => {
      if (value && value.length > 5) {
        return false
      }
      return true
    })
    .test('fileRequired', 'Ảnh sản phẩm không được để trống', (value) => {
      if (value && value.length === 0) {
        return false
      }
      return true
    })
})
