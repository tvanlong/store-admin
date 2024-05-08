import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <Helmet>
        <title>404 | Not Found</title>
        <meta name='description' content='404 | Not Found' />
      </Helmet>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600'>404</h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl'>
            Không tìm thấy trang này 🙈
          </p>
          <p className='mb-4 text-lg font-light text-gray-500'>
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang
            chủ.
          </p>
          <a
            href='/'
            className='inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4'
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </section>
  )
}

export default NotFound
