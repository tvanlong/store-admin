import http from '~/utils/http'

export const uploadImages = (data) =>
  http.post('/api/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const deleteImage = (name) => http.delete(`/api/upload/${name}`)
