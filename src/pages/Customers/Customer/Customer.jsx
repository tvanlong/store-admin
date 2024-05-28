import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import NoData from '~/components/NoData'
import { useCustomers } from '~/hooks/useCustomers'
import { formatDateTime } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Customer({ setProgress }) {
  const { data, isLoading } = useCustomers()
  const customers = data?.data?.data || []

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <Helmet>
        <title>Khách hàng | Trang quản trị lưu trữ danh sách khách hàng</title>
        <meta name='description' content='Trang quản trị | Danh sách khách hàng' />
      </Helmet>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách khách hàng
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các khách hàng đã đăng ký tài khoản trên hệ thống
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên khách hàng</Table.HeadCell>
            <Table.HeadCell>Số điện thoãi</Table.HeadCell>
            <Table.HeadCell>Địa chỉ Email</Table.HeadCell>
            <Table.HeadCell>Ngày tạo</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {customers.map((customer) => (
              <Table.Row key={customer._id} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{customer.name}</Table.Cell>
                <Table.Cell>{customer.phone}</Table.Cell>
                <Table.Cell>{customer.email}</Table.Cell>
                <Table.Cell>{formatDateTime(customer.createdAt)}</Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link className='font-medium text-cyan-600 hover:underline'>Cập nhật</Link>
                  <Link className='font-medium text-red-600 hover:underline'>Xóa</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Customer
