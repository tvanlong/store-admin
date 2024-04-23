import { useSpring, animated } from '@react-spring/web'

function Card({ color, icon, title, animatedValue, label }) {
  const springProps = useSpring({ [label]: animatedValue, from: { [label]: 0 } })

  return (
    <div
      className={'border rounded-lg overflow-hidden'}
      style={{
        borderColor: color
      }}
    >
      <div
        className={'flex items-center text-white py-2 px-2'}
        style={{
          backgroundColor: color
        }}
      >
        <div className='mr-3'>{icon}</div>
        <div className='text-right'>
          <div className='text-2xl font-bold'>
            <animated.span>{springProps[label].to((val) => Math.floor(val))}</animated.span>
          </div>
          <div className='text-xs font-medium'>{title}</div>
        </div>
      </div>
      <div className='bg-[#f9fafb] text-[#337ab7] flex justify-between px-2 py-3'>
        <div className='text-xs font-medium'>View Details</div>
        <svg className='w-4 h-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
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
  )
}

export default Card
