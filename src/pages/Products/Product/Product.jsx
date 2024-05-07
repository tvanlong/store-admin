import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteImage } from '~/apis/images.api'
import { deleteProduct, getAllProducts } from '~/apis/products.api'
import NoData from '~/components/NoData'
import config from '~/constants/config'
import useDebounce from '~/hooks/useDebounce'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'
import { tableTheme } from '~/utils/theme'

const LIMIT = 5

function Product({ setProgress }) {
  const queryParamsConfig = useQueryParamsConfig()
  const queryClient = useQueryClient()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(searchValue, 700)
  const newQueryParamsConfig = {
    page: currentPage,
    limit: LIMIT,
    ...queryParamsConfig,
    search: debouncedValue === '' ? undefined : debouncedValue
  }
  const { data, isLoading } = useQuery({
    queryKey: ['products', newQueryParamsConfig],
    queryFn: () => {
      setLoading(false)
      return getAllProducts(newQueryParamsConfig)
    },
    placeholderData: keepPreviousData
  })

  const products = data?.data?.data.docs || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setLoading(false)
    }
  }, [debouncedValue])

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (name) => deleteImage(name)
  })

  const { mutateAsync: deleteProductMutateAsync } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const handleDeleteProduct = (product) => {
    if (product.versions.length > 0) {
      return toast.error('Không thể xóa dòng sản phẩm này!')
    }

    toast.promise(deleteProductMutateAsync(product._id), {
      loading: 'Đang tiến hành xóa dòng sản phẩm...',
      success: () => 'Xóa dòng sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa dòng sản phẩm thất bại'
      }
    })

    product.images.forEach(async (image) => {
      await deleteImageMutateAsync(image)
    })
  }

  const onPageChange = (page) => setCurrentPage(page)

  const handleSearch = (e) => {
    const value = e.target.value.trimStart()
    setLoading(true)
    setSearchValue(value)
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách dòng sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các dòng sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <form className='mx-10 my-10'>
        <div className='max-w-sm relative w-full'>
          <button type='submit' className='absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer'>
            <svg
              className='w-4 h-4 text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </button>
          <input
            type='text'
            id='simple-search'
            value={searchValue}
            onChange={(e) => handleSearch(e)}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full ps-10 p-2.5 '
            placeholder='Tìm kiếm dòng sản phẩm...'
          />
          {loading && (
            <div className='absolute inset-y-0 end-4 flex items-center ps-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='inline w-4 h-4 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          )}
          {!!searchValue && !loading && (
            <div
              className='absolute inset-y-0 end-4 flex items-center ps-3 cursor-pointer'
              onClick={() => setSearchValue('')}
            >
              <svg
                className='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
        </div>
      </form>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Dòng sản phẩm</Table.HeadCell>
            <Table.HeadCell>Loại danh mục</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {products.length > 0 ? (
              products.map((product) => (
                <Table.Row key={product._id} className='bg-white dark:border-gray-700'>
                  <Table.Cell width='30%' className='font-medium text-gray-900 max-w-sm'>
                    {product.name}
                  </Table.Cell>
                  <Table.Cell width='20%'>{product.subcategory.name}</Table.Cell>
                  <Table.Cell width='35%'>
                    <div className='flex items-center gap-3'>
                      {product.images.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={`${config.baseURL}/api/upload/${image}`}
                          alt={product.name}
                          className='w-20 h-20 object-cover rounded-lg border border-gray-300'
                        />
                      ))}
                      {product.images.length > 2 && (
                        <div className='w-20 h-20 flex items-center justify-center rounded-lg border border-gray-300'>
                          <span className='text-gray-400'>+{product.images.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell width='15%'>
                    <div className='flex gap-4 items-center'>
                      <Link to={`/update-product/${product._id}`} className='font-medium text-cyan-600 hover:underline'>
                        Cập nhật
                      </Link>
                      <Link
                        className='font-medium text-red-600 hover:underline'
                        onClick={() => handleDeleteProduct(product)}
                      >
                        Xóa
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} className='text-center'>
                  Không có dữ liệu
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {data?.data?.data.totalPages > 1 && (
        <div className='flex overflow-x-auto sm:justify-center mt-10'>
          <Pagination
            className='text-sm'
            currentPage={currentPage}
            totalPages={data?.data?.data.totalPages}
            onPageChange={onPageChange}
            previousLabel='Trang trước'
            nextLabel='Trang sau'
          />
        </div>
      )}
    </div>
  )
}

export default Product
