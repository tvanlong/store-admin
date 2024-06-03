import { useSpring, animated } from '@react-spring/web'
import { Link } from 'react-router-dom'

function Card({ color, icon, title, animatedValue, label, path }) {
  const springProps = useSpring({ [label]: animatedValue, from: { [label]: 0 } })

  return (
    <div
      className={'overflow-hidden rounded-lg border'}
      style={{
        borderColor: color
      }}
    >
      <div
        className={'flex items-center px-2 py-2 text-white'}
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
      <div className='flex justify-between bg-[#f9fafb] px-2 py-3 text-[#337ab7]'>
        <Link to={path} className='text-xs font-medium'>
          View Details
        </Link>
        <svg className='h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
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
