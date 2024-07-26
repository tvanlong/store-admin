import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Pagination, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import versionApi from '~/apis/version.api'
import Breadcrumb from '~/components/Breadcrumb'
import FilterField from '~/components/FilterField'
import ModalDelete from '~/components/ModalDelete'
import NoData from '~/components/NoData'
import PopupModal from '~/components/PopupModal'
import SearchField from '~/components/SearchField'
import UpdateButton from '~/components/UpdateButton'
import { INITIAL_PAGE, LIMIT_ITEM } from '~/constants/default'
import { priceOptions, sortOptions } from '~/constants/options'
import { path } from '~/constants/path'
import useDebounce from '~/hooks/useDebounce'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'
import { formatCurrency } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Accessory({ setProgress }) {
  const navigate = useNavigate()
  const queryParamsConfig = useQueryParamsConfig()
  const queryClient = useQueryClient()
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE)
  const [loading, setLoading] = useState(false)
  const [queryParams, setQueryParams] = useState({
    ...queryParamsConfig,
    page: currentPage,
    limit: LIMIT_ITEM
  })
  const debouncedValue = useDebounce(searchValue, 700)

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page: currentPage,
      keyword: debouncedValue === '' ? undefined : debouncedValue
    }))
  }, [debouncedValue, currentPage])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['accessories', queryParams],
    queryFn: () => {
      setLoading(false)
      return versionApi.getAllAccessories(queryParams)
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

  const { mutateAsync: softDeleteVersion } = useMutation({
    mutationFn: (id) => versionApi.softDeleteVersion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessories'] })
      queryClient.invalidateQueries({ queryKey: ['trash-versions'] })
    }
  })

  const handleDeleteVersion = (version) => {
    toast.promise(softDeleteVersion(version._id), {
      loading: 'Đang tiến hành xóa sản phẩm...',
      success: () => 'Xóa dòng sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa dòng sản phẩm thất bại'
      }
    })
  }

  const onPageChange = (page) => setCurrentPage(page)

  const onSortChange = (param, value) => {
    setQueryParams((prev) => {
      if (Array.isArray(param)) {
        return {
          ...prev,
          [param[0]]: value[0],
          [param[1]]: value[1]
        }
      } else {
        return {
          ...prev,
          sort: param,
          order: value
        }
      }
    })
    refetch()
  }

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['version', id],
      queryFn: () => versionApi.getVersionById(id),
      staleTime: 1000 * 5 // 5 seconds
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh sách Linh kiện sản phẩm | Trang quản trị lưu trữ danh sách linh kiện sản phẩm</title>
        <meta name='description' content='Danh sách Linh kiện sản phẩm' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Danh sách linh kiện sản phẩm' />
        <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Danh sách linh kiện sản phẩm</h2>
        <div className='items-center justify-between block sm:flex md:divide-x md:divide-gray-100'>
          <div className='flex items-center mb-4 sm:mb-0'>
            <SearchField
              loading={loading}
              setLoading={setLoading}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <div className='flex items-center w-full sm:justify-end'>
              <div className='flex pl-2 space-x-1'>
                <div className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100'>
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='space-x-5'>
            <button
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'
              type='button'
              onClick={() => navigate(path.version)}
            >
              💻 Laptop
            </button>
            <button
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'
              type='button'
              onClick={() => navigate(path.addVersion)}
            >
              📁 Thêm mới
            </button>
            <button
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'
              type='button'
              onClick={() => navigate(path.trashVersion)}
            >
              🗑️ Thùng rác
            </button>
          </div>
        </div>
        <div className='flex mt-5 gap-5'>
          <FilterField options={sortOptions} onSortChange={onSortChange} />
          <FilterField defaultLabel='Lọc theo khoảng giá' options={priceOptions} onSortChange={onSortChange} />
        </div>
      </div>
      <div className='mx-10 overflow-x-auto'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Sản phẩm</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>Giá sản phẩm</Table.HeadCell>
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
                    <div className='flex items-center gap-4'>
                      <PopupModal version={version} />
                      <UpdateButton path={`/update-version/${version._id}`} />
                      <ModalDelete
                        title='Bạn có chắc chắn muốn xóa phiên bản sản phẩm này không?'
                        handleDelete={() => handleDeleteVersion(version)}
                      />
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

export default Accessory
