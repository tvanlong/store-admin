import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <section className='bg-white'>
      <Helmet>
        <title>404 | Not Found</title>
        <meta name='description' content='404 | Not Found' />
      </Helmet>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl'>404</h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
            Không tìm thấy trang này 🙈
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang
            chủ.
          </p>
          <a
            href='/'
            className='my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </section>
  )
}

export default NotFound
