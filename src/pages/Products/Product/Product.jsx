import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteImage } from '~/apis/images.api'
import { deleteProduct, getAllProducts, getProduct } from '~/apis/products.api'
import FilterField from '~/components/FilterField'
import ModalDelete from '~/components/ModalDelete'
import NoData from '~/components/NoData'
import SearchField from '~/components/SearchField'
import useDebounce from '~/hooks/useDebounce'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'
import { tableTheme } from '~/utils/theme'
import { extractPublicIdFromUrl } from '~/utils/util'

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
    keyword: debouncedValue === '' ? undefined : debouncedValue
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
    mutationFn: (public_id) => deleteImage(public_id)
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
      const public_id = extractPublicIdFromUrl(image)
      await deleteImageMutateAsync(public_id)
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

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => getProduct(id)
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Dòng sản phẩm | Trang quản trị lưu trữ danh sách dòng sản phẩm</title>
        <meta name='description' content='Trang quản trị | Danh sách dòng sản phẩm' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh sách dòng sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các dòng sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='mx-10 my-10 flex items-center gap-5 rounded-md bg-gray-200/80 p-3'>
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
      <div className='mx-10 overflow-x-auto'>
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
                <Table.Row
                  key={product._id}
                  className='bg-white'
                  onMouseEnter={() => handlePrefetchOnMouseEnter(product._id)}
                >
                  <Table.Cell width='30%' className='max-w-sm font-medium text-gray-900'>
                    {product.name}
                  </Table.Cell>
                  <Table.Cell width='20%'>{product.subcategory.name}</Table.Cell>
                  <Table.Cell width='35%'>
                    <div className='flex items-center gap-3'>
                      {product.images.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={product.name}
                          className='h-16 w-16 rounded-lg border border-gray-300 object-cover'
                        />
                      ))}
                      {product.images.length > 2 && (
                        <div className='flex h-16 w-16 items-center justify-center rounded-lg border border-gray-300'>
                          <span className='text-gray-400'>+{product.images.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell width='15%'>
                    <div className='flex items-center gap-4'>
                      <Link to={`/update-product/${product._id}`} className='font-medium text-cyan-600 hover:underline'>
                        Cập nhật
                      </Link>
                      <ModalDelete
                        title='Bạn có chắc chắn muốn xóa dòng sản phẩm này không?'
                        handleDelete={() => handleDeleteProduct(product)}
                      />
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
        <div className='mt-10 flex overflow-x-auto sm:justify-center'>
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
