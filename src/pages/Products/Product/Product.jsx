import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteImage } from '~/apis/images.api'
import { deleteProduct, getAllProducts } from '~/apis/products.api'
import FilterField from '~/components/FilterField'
import NoData from '~/components/NoData'
import SearchField from '~/components/SearchField'
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
  let newQueryParamsConfig = {
    page: currentPage,
    limit: LIMIT,
    ...queryParamsConfig,
    search: debouncedValue === '' ? undefined : debouncedValue
  }
  const { data, isLoading, refetch } = useQuery({
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
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
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

  const onSortChange = (sort_by, value) => {
    newQueryParamsConfig = {
      ...newQueryParamsConfig,
      sort: sort_by,
      order: value
    }
    refetch()
  }

  const onPageChange = (page) => setCurrentPage(page)

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <Helmet>
        <title>Dòng sản phẩm | Trang quản trị lưu trữ danh sách dòng sản phẩm</title>
        <meta name='description' content='Trang quản trị | Danh sách dòng sản phẩm' />
      </Helmet>
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
      <div className='flex items-center bg-gray-200/80 p-3 rounded-md gap-5 mx-10 my-10'>
        <SearchField
          loading={loading}
          setLoading={setLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <FilterField
          options={[
            { sort_by: 'createdAt', value: 'new', label: 'Mới nhất' },
            { sort_by: 'createdAt', value: 'old', label: 'Cũ nhất' }
          ]}
          onSortChange={onSortChange}
        />
      </div>
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
                          className='w-16 h-16 object-cover rounded-lg border border-gray-300'
                        />
                      ))}
                      {product.images.length > 2 && (
                        <div className='w-16 h-16 flex items-center justify-center rounded-lg border border-gray-300'>
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
