import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteStaff, getAllStaffs } from '~/apis/users.api'
import NoData from '~/components/NoData'
import { getUserDataFromLocalStorage } from '~/utils/auth'
import { formatDateTime } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Staff({ setProgress }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['staffs'],
    queryFn: getAllStaffs
  })
  const staffs = data?.data?.data || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] })
    }
  })

  const handleDelete = (id) => {
    const user = getUserDataFromLocalStorage()
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

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách nhân viên
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các nhân viên đã đăng ký tài khoản trên hệ thống
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
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
              <Table.Row key={staff._id} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{staff.name}</Table.Cell>
                <Table.Cell>{staff.phone}</Table.Cell>
                <Table.Cell>{staff.email}</Table.Cell>
                <Table.Cell>{formatDateTime(staff.createdAt)}</Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link to={`/update-staff/${staff._id}`} className='font-medium text-cyan-600 hover:underline'>
                    Cập nhật
                  </Link>
                  <Link onClick={() => handleDelete(staff._id)} className='font-medium text-red-600 hover:underline'>
                    Xóa
                  </Link>
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
