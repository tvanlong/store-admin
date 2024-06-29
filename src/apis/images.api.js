import http from '~/utils/http'

const imagesApi = {
  uploadImages: (data) =>
    http.post('/api/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  deleteImage: (public_id) => http.delete(`/api/upload/${public_id}`),
  uploadAvatar: (id, data) =>
    http.patch(`/api/upload/avatar/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default imagesApi
