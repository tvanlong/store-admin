import { Spinner } from 'flowbite-react'

function Loading() {
  return (
    <div
      className='mt-[68px] flex justify-center items-center'
      style={{
        height: 'calc(100vh - 68px)'
      }}
    >
      <div className='text-center'>
        <Spinner aria-label='Center-aligned spinner example' />
      </div>
    </div>
  )
}

export default Loading
