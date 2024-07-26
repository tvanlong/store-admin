import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Table } from 'flowbite-react'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { HiOutlineCursorClick } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import usersApi from '~/apis/users.api'
import Breadcrumb from '~/components/Breadcrumb'
import ModalDelete from '~/components/ModalDelete'
import NoData from '~/components/NoData'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import NoPermission from '~/pages/NoPermission'
import { formatDateTime } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function TrashStaff({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['trash-staffs'],
    queryFn: usersApi.getListDeletedStaffs,
    enabled: profile.role === 'admin'
  })
  const staffs = data?.data?.data || []

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync: forceDeleteStaff } = useMutation({
    mutationFn: usersApi.deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trash-staffs'] })
    }
  })

  const handleDelete = (id) => {
    toast.promise(forceDeleteStaff(id), {
      loading: 'Đang tiến hành xóa nhân viên...',
      success: 'Xóa nhân viên thành công',
      error: (err) => err?.response?.data?.message || 'Xóa nhân viên thất bại'
    })
  }

  const { mutateAsync: restoreDeletedStaff } = useMutation({
    mutationFn: usersApi.restoreDeletedStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trash-staffs'] })
      queryClient.invalidateQueries({ queryKey: ['staffs'] })
    }
  })

  const handleRestore = (id) => {
    toast.promise(restoreDeletedStaff(id), {
      loading: 'Đang tiến hành khôi phục nhân viên...',
      success: 'Khôi phục nhân viên thành công',
      error: (err) => err?.response?.data?.message || 'Khôi phục nhân viên thất bại'
    })
  }

  if (profile.role !== 'admin') return <NoPermission />

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh sách nhân viên | Trang quản trị lưu trữ danh sách nhân viên</title>
        <meta name='description' content='Trang quản trị | Danh sách nhân viên' />
      </Helmet>
      <div className='mx-10 mb-10 mt-20'>
        <Breadcrumb location='Danh sách nhân viên' />
        <h2 className='mb-4 text-3xl font-extrabold text-gray-900'>Danh sách nhân viên đã xóa</h2>
        <div className='items-center justify-between block sm:flex md:divide-x md:divide-gray-100'>
          <div className='flex items-center mb-4 sm:mb-0'>
            <form className='sm:pr-3'>
              <label htmlFor='products-search' className='sr-only'>
                Search
              </label>
              <div className='relative w-48 mt-1 sm:w-64 xl:w-96'>
                <input
                  type='text'
                  name='email'
                  id='products-search'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                  placeholder='Tìm kiếm nhân viên...'
                />
              </div>
            </form>
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
              onClick={() => navigate(path.staff)}
            >
              Quay lại danh sách nhân viên 📁
            </button>
          </div>
        </div>
      </div>
      <div className='mx-10 overflow-x-auto'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên nhân viên</Table.HeadCell>
            <Table.HeadCell>Số điện thoại</Table.HeadCell>
            <Table.HeadCell>Địa chỉ email</Table.HeadCell>
            <Table.HeadCell>Ngày tạo</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {staffs.length > 0 ? (
              staffs.map((staff) => (
                <Table.Row key={staff._id} className='bg-white'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{staff.name}</Table.Cell>
                  <Table.Cell>{staff.phone}</Table.Cell>
                  <Table.Cell>{staff.email}</Table.Cell>
                  <Table.Cell>{formatDateTime(staff.createdAt)}</Table.Cell>
                  <Table.Cell className='flex gap-5'>
                    <Button
                      size='xs'
                      className='bg-yellow-400 hover:bg-yellow-400 text-white'
                      onClick={() => handleRestore(staff._id)}
                    >
                      <HiOutlineCursorClick className='mr-2 h-5 w-5' />
                      Khôi phục
                    </Button>
                    <ModalDelete
                      title='Bạn có chắc chắn muốn xóa nhân viên này?'
                      handleDelete={() => handleDelete(staff._id)}
                      isForceDelete
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={6}>
                  <div className='text-center'>Không có nhân viên nào trong danh sách đã xóa.</div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default TrashStaff
