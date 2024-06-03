import { Badge, Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import DetailOrderModal from '~/components/DetailOrderModal'
import NoData from '~/components/NoData'
import { useOrders } from '~/hooks/useOrders'
import { formatCurrency, formatDateTime } from '~/utils/format'
import { tableTheme } from '~/utils/theme'

function Order({ setProgress }) {
  const { data, isLoading } = useOrders()
  const orders = data?.data?.data || []

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
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh sách đơn hàng | Trang quản trị lưu trữ danh sách đơn hàng</title>
        <meta name='description' content='Trang quản trị | Danh sách đơn hàng' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh sách đơn hàng
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các đơn hàng đã được đặt hàng trên hệ thống
        </p>
      </div>
      <div className='mx-10 overflow-x-auto'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Mã đơn hàng</Table.HeadCell>
            <Table.HeadCell>Tên khách hàng</Table.HeadCell>
            <Table.HeadCell>Ngày đặt hàng</Table.HeadCell>
            <Table.HeadCell>Tổng tiền</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {orders.map((order) => (
              <Table.Row key={order._id} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  DH{order._id.toUpperCase()}
                </Table.Cell>
                <Table.Cell>{order.user.name}</Table.Cell>
                <Table.Cell>{formatDateTime(order.createdAt)}</Table.Cell>
                <Table.Cell>{formatCurrency(order.total_price)}đ</Table.Cell>
                <Table.Cell>
                  {order.status === 'Chờ xác nhận' ? (
                    <Badge color='yellow'>Chờ xác nhận</Badge>
                  ) : order.status === 'Đang giao hàng' ? (
                    <Badge color='blue'>Đang giao hàng</Badge>
                  ) : order.status === 'Đã giao hàng' ? (
                    <Badge color='green'>Đã giao hàng</Badge>
                  ) : (
                    <Badge color='red'>Đã hủy</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <DetailOrderModal order={order} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Order
