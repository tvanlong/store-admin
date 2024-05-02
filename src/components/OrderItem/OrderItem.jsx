import config from '~/constants/config'
import { formatCurrency } from '~/utils/format'

function OrderItem({ item }) {
  const { quantity, version } = item

  return (
    <div className='space-y-6 border border-gray-200 rounded-lg my-2 p-5'>
      <p className='text-sm leading-relaxed text-gray-500'>
        {version.product.name} {version.name}
      </p>
      <div className='flex gap-3 justify-center'>
        {version.product.images.map((image, index) => (
          <img
            key={index}
            src={`${config.baseURL}/api/upload/${image}`}
            alt={version.product.name}
            className='w-28 h-28 object-contain'
          />
        ))}
      </div>
      <p className='text-sm leading-relaxed text-gray-500'>
        Giá sản phẩm: {formatCurrency(version.current_price)} VNĐ {quantity > 1 && `x ${quantity}`}
      </p>
      {version.description.map((desc, index) => {
        const spec = desc.split(':')
        return (
          <p key={index} className='text-sm leading-relaxed text-gray-500'>
            {spec[0]}: {spec[1]}
          </p>
        )
      })}
    </div>
  )
}

export default OrderItem
