import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteVersion, getAllVersions, getVersionById } from '~/apis/version.api'
import FilterField from '~/components/FilterField'
import NoData from '~/components/NoData'
import PopupModal from '~/components/PopupModal'
import SearchField from '~/components/SearchField'
import useDebounce from '~/hooks/useDebounce'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'
import { formatCurrency } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

const LIMIT = 5

function Version({ setProgress }) {
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
    queryKey: ['versions', newQueryParamsConfig],
    queryFn: () => {
      setLoading(false)
      return getAllVersions(newQueryParamsConfig)
    },
    placeholderData: keepPreviousData
  })

  const versions = data?.data?.data.docs || []

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

  const { mutateAsync: deleteVersionMutateAsync } = useMutation({
    mutationFn: (id) => deleteVersion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['versions'] })
    }
  })

  const handleDeleteVersion = (version) => {
    toast.promise(deleteVersionMutateAsync(version._id), {
      loading: 'Đang tiến hành xóa dòng sản phẩm...',
      success: () => 'Xóa dòng sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa dòng sản phẩm thất bại'
      }
    })
  }

  const onPageChange = (page) => setCurrentPage(page)

  const onSortChange = (sort_by, value) => {
    newQueryParamsConfig = {
      ...newQueryParamsConfig,
      sort: sort_by,
      order: value
    }
    refetch()
  }

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['version', id],
      queryFn: () => getVersionById(id)
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh sách phiên bản sản phẩm | Trang quản trị lưu trữ danh sách phiên bản sản phẩm</title>
        <meta name='description' content='Danh sách phiên bản sản phẩm' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh sách phiên bản sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các phiên bản sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
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
            { sort_by: 'createdAt', value: 'old', label: 'Cũ nhất' },
            { sort_by: 'price', value: 'asc', label: 'Giá thấp - cao' },
            { sort_by: 'price', value: 'desc', label: 'Giá cao - thấp' }
          ]}
          onSortChange={onSortChange}
        />
      </div>
      <div className='mx-10 overflow-x-auto'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Sản phẩm</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>Giá sản phẩm</Table.HeadCell>
            <Table.HeadCell>Tình trạng sản phẩm</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {versions.length > 0 ? (
              versions.map((version) => (
                <Table.Row
                  key={version._id}
                  className='bg-white'
                  onMouseEnter={() => handlePrefetchOnMouseEnter(version._id)}
                >
                  <Table.Cell className='max-w-sm font-medium text-gray-900'>
                    {version.product.name} ({version.name})
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-3'>
                      {version.product.images.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={version.product.name}
                          className='h-16 w-16 rounded-lg border border-gray-300 object-cover'
                        />
                      ))}
                      {version.product.images.length > 2 && (
                        <div className='flex h-16 w-16 items-center justify-center rounded-lg border border-gray-300'>
                          <span className='text-gray-400'>+{version.product.images.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{formatCurrency(version.current_price)} VNĐ</Table.Cell>
                  <Table.Cell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${
                        version.status === 'Còn hàng' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {version.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-4'>
                      <PopupModal version={version} />
                      <Link to={`/update-version/${version._id}`} className='font-medium text-cyan-600 hover:underline'>
                        Cập nhật
                      </Link>
                      <Link
                        className='font-medium text-red-600 hover:underline'
                        onClick={() => handleDeleteVersion(version)}
                      >
                        Xóa
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={5} className='text-center'>
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

export default Version
