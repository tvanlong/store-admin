import { useSpring, animated } from '@react-spring/web'

function Cards() {
  const category = useSpring({ categories: 10, from: { categories: 0 } })
  const subcategory = useSpring({ subcategories: 32, from: { subcategories: 0 } })
  const product = useSpring({ products: 40, from: { products: 0 } })
  const customer = useSpring({ customers: 68, from: { customers: 0 } })
  const order = useSpring({ orders: 68, from: { orders: 0 } })

  return (
    <div className='flex justify-center gap-5 my-20'>
      <div className='border border-[#337ab7] rounded-lg overflow-hidden'>
        <div className='flex items-center text-white bg-[#337ab7] py-2 px-2'>
          <div className='mr-3'>
            <svg
              className='w-16 h-16'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
            </svg>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              <animated.span>{category.categories.to((val) => Math.floor(val))}</animated.span>
            </div>
            <div className='text-xs font-medium'>Danh mục lớn</div>
          </div>
        </div>
        <div className='bg-[#f9fafb] text-[#337ab7] flex justify-between px-2 py-3'>
          <div className='text-xs font-medium'>View Details</div>
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 12H5m14 0-4 4m4-4-4-4'
            />
          </svg>
        </div>
      </div>
      <div className='border border-[#00bae8] rounded-lg overflow-hidden'>
        <div className='flex items-center text-white bg-[#00bae8] py-2 px-2'>
          <div className='mr-3'>
            <svg
              className='w-16 h-16'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h14' />
            </svg>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              <animated.span>{subcategory.subcategories.to((val) => Math.floor(val))}</animated.span>
            </div>
            <div className='text-xs font-medium'>Danh mục nhỏ</div>
          </div>
        </div>
        <div className='bg-[#f9fafb] text-[#337ab7] flex justify-between px-2 py-3'>
          <div className='text-xs font-medium'>View Details</div>
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 12H5m14 0-4 4m4-4-4-4'
            />
          </svg>
        </div>
      </div>
      <div className='border border-[#5cb85c] rounded-lg overflow-hidden'>
        <div className='flex items-center text-white bg-[#5cb85c] py-2 px-2'>
          <div className='mr-3'>
            <svg
              className='w-16 h-16'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                fillRule='evenodd'
                d='M4.9 3C3.9 3 3 3.8 3 4.9V9c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V9c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9V5c0-1-.8-1.9-1.9-1.9h-4Zm-10 10c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H9c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9H5Zm10 0c-1 0-1.9.8-1.9 1.9V19c0 1 .8 1.9 1.9 1.9H19c1 0 1.9-.8 1.9-1.9v-4c0-1-.8-1.9-1.9-1.9h-4Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              <animated.span>{product.products.to((val) => Math.floor(val))}</animated.span>
            </div>
            <div className='text-xs font-medium'>T sản phẩm</div>
          </div>
        </div>
        <div className='bg-[#f9fafb] text-[#5cb85c] flex justify-between px-2 py-3'>
          <div className='text-xs font-medium'>View Details</div>
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 12H5m14 0-4 4m4-4-4-4'
            />
          </svg>
        </div>
      </div>
      <div className='border border-[#f0ad4e] rounded-lg overflow-hidden'>
        <div className='flex items-center text-white bg-[#f0ad4e] py-2 px-2'>
          <div className='mr-3'>
            <svg
              className='w-16 h-16'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                fillRule='evenodd'
                d='M4 4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3c0-.6.4-1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 4a3 3 0 0 0-3 2v.2c0 .1-.1.2 0 .2v.2c.3.2.6.4.9.4h6c.3 0 .6-.2.8-.4l.2-.2v-.2l-.1-.1A3 3 0 0 0 10 14H7.9Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              <animated.span>{customer.customers.to((val) => Math.floor(val))}</animated.span>
            </div>
            <div className='text-xs font-medium'>Tổng khách hàng</div>
          </div>
        </div>
        <div className='bg-[#f9fafb] text-[#f0ad4e] flex justify-between px-2 py-3'>
          <div className='text-xs font-medium'>View Details</div>
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 12H5m14 0-4 4m4-4-4-4'
            />
          </svg>
        </div>
      </div>
      <div className='border border-[#d9534f] rounded-lg overflow-hidden'>
        <div className='flex items-center text-white bg-[#d9534f] py-2 px-2'>
          <div className='mr-3'>
            <svg
              className='w-16 h-16'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M12 6.2 7 9.4l5 3.2-5 3.2-5-3.3 5-3.1-5-3.2L7 3l5 3.2ZM7 17.8l5-3.2 5 3.2-5 3.2-5-3.2Z' />
              <path d='m12 12.5 5-3.1-5-3.2L17 3l5 3.2-5 3.2 5 3.2-5 3.2-5-3.3Z' />
            </svg>
          </div>
          <div className='text-right'>
            <div className='text-2xl font-bold'>
              <animated.span>{order.orders.to((val) => Math.floor(val))}</animated.span>
            </div>
            <div className='text-xs font-medium'>Tổng đơn hàng</div>
          </div>
        </div>
        <div className='bg-[#f9fafb] text-[#d9534f] flex justify-between px-2 py-3'>
          <div className='text-xs font-medium'>View Details</div>
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 12H5m14 0-4 4m4-4-4-4'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Cards
