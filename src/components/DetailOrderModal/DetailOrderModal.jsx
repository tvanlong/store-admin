import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal } from 'flowbite-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { toast } from 'sonner'
import ordersApi from '~/apis/orders.api'
import OrderItem from '~/components/OrderItem'

function DetailOrderModal({ order }) {
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState(false)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => ordersApi.updateStatusOrder(order.user._id, order._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      setOpenModal(false)
    }
  })

  const handleConfirm = async () => {
    toast.promise(mutateAsync({ status: 'Đang giao hàng' }), {
      loading: 'Đang xác nhận đơn hàng...',
      success: 'Xác nhận đơn hàng thành công',
      error: 'Xác nhận đơn hàng thất bại'
    })
  }

  const handleConfirmSuccess = () => {
    toast.promise(mutateAsync({ status: 'Đã giao hàng' }), {
      loading: 'Đang xác nhận đơn hàng...',
      success: 'Xác nhận đơn hàng thành công',
      error: 'Xác nhận đơn hàng thất bại'
    })
  }

  const handleCancel = () => {
    toast.promise(mutateAsync({ status: 'Đã hủy' }), {
      loading: 'Đang hủy đơn hàng...',
      success: 'Hủy đơn hàng thành công',
      error: 'Hủy đơn hàng thất bại'
    })
  }

  return (
    <>
      <Button size='xs' className='bg-green-600 hover:bg-green-600 text-white' onClick={() => setOpenModal(true)}>
        <HiOutlineSearchCircle className='mr-2 h-5 w-5' />
        Chi tiết
      </Button>
      <Modal theme='3xl' show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thông tin chi tiết đơn hàng</Modal.Header>
        <Modal.Body>
          {order.items.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          {order.status === 'Chờ xác nhận' && (
            <Button outline gradientDuoTone='cyanToBlue' onClick={handleConfirm} isProcessing={isPending}>
              Xác nhận đơn hàng
            </Button>
          )}
          {order.status === 'Đang giao hàng' && (
            <Button outline gradientDuoTone='greenToBlue' onClick={handleConfirmSuccess} isProcessing={isPending}>
              Đã giao hàng
            </Button>
          )}
          {(order.status === 'Chờ xác nhận' || order.status === 'Đang giao hàng') && (
            <Button outline gradientDuoTone='pinkToOrange' onClick={handleCancel}>
              Hủy đơn hàng
            </Button>
          )}
          <Button color='light' onClick={() => setOpenModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

DetailOrderModal.propTypes = {
  order: PropTypes.object
}

export default DetailOrderModal
