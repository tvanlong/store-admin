import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteVersion, getAllVersions } from '~/apis/version.api'
import NoData from '~/components/NoData'
import PopupModal from '~/components/PopupModal'
import config from '~/constants/config'
import { formatCurrency } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Version({ setProgress }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['versions'],
    queryFn: getAllVersions
  })

  const versions = data?.data?.data.docs || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

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

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách phiên bản sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các phiên bản sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
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
            {versions.map((version) => (
              <Table.Row key={version._id} className='bg-white'>
                <Table.Cell className='font-medium text-gray-900 max-w-sm'>
                  {version.product.name} {version.name}
                </Table.Cell>
                <Table.Cell>
                  <div className='flex items-center gap-3'>
                    {version.product.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${config.baseURL}/api/upload/${image}`}
                        alt={version.product.name}
                        className='w-20 h-20 object-cover rounded-lg border border-gray-300'
                      />
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell>{formatCurrency(version.current_price)} VNĐ</Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
                      version.status === 'Còn hàng' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {version.status}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className='flex gap-4 items-center'>
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
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Version
