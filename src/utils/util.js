// Hàm trích xuất public_id từ URL
export const extractPublicIdFromUrl = (url) => {
  const regex = /\/v\d+\/([^/]+)\.\w+$/
  const matches = url.match(regex)
  return matches ? matches[1] : null
}
