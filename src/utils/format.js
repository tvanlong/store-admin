export const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  date.setHours(date.getHours() + 7) // Cộng thêm 7 giờ để đổi múi giờ UTC sang múi giờ Việt Nam
  var options = { timeZone: 'Asia/Ho_Chi_Minh' } // Cài đặt múi giờ Việt Nam
  var formattedDate = date.toLocaleString('vi-VN', options)
  return formattedDate
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
