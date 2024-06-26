import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteStaff, getAllStaffs, getStaff } from '~/apis/users.api'
import ModalDelete from '~/components/ModalDelete'
import NoData from '~/components/NoData'
import { AppContext } from '~/context/app.context'
import NoPermission from '~/pages/NoPermission'
import { getProfileFromLS } from '~/utils/auth'
import { formatDateTime } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Staff({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['staffs'],
    queryFn: getAllStaffs,
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

  const { mutateAsync } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] })
    }
  })

  const handleDelete = (id) => {
    const user = getProfileFromLS()
    if (user._id === id) {
      toast.warning('Tài khoản đang đăng nhập không thể xóa')
      return
    }

    toast.promise(mutateAsync(id), {
      loading: 'Đang tiến hành xóa nhân viên...',
      success: 'Xóa nhân viên thành công',
      error: (err) => err?.response?.data?.message || 'Thêm nhân viên thất bại'
    })
  }

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['staff', id],
      queryFn: () => getStaff(id)
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
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh sách nhân viên
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các nhân viên đã đăng ký tài khoản trên hệ thống
        </p>
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
            {staffs.map((staff) => (
              <Table.Row
                key={staff._id}
                className='bg-white'
                onMouseEnter={() => handlePrefetchOnMouseEnter(staff._id)}
              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{staff.name}</Table.Cell>
                <Table.Cell>{staff.phone}</Table.Cell>
                <Table.Cell>{staff.email}</Table.Cell>
                <Table.Cell>{formatDateTime(staff.createdAt)}</Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link to={`/update-staff/${staff._id}`} className='font-medium text-cyan-600 hover:underline'>
                    Cập nhật
                  </Link>
                  <ModalDelete
                    title='Bạn có chắc chắn muốn xóa nhân viên này?'
                    handleDelete={() => handleDelete(staff._id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Staff
