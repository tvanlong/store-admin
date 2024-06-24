import { useNavigate } from 'react-router-dom'

function NoPermission() {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-100'>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <img src='https://www.svgrepo.com/show/426192/cogs-settings.svg' alt='Logo' className='mb-8 h-40' />
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-700 mb-4'>
          Bạn không có quyền truy cập trang này 🚫
        </h1>
        <p className='text-center text-gray-500 text-lg md:text-xl lg:text-2xl mb-8'>
          Vui lòng yêu cầu quyền truy cập từ quản trị viên
        </p>
        <div className='flex space-x-4'>
          <button
            className='bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded'
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
          <button href='#' className='border-2 border-gray-800 text-black font-bold py-3 px-6 rounded'>
            Liên hệ hỗ trợ
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoPermission
