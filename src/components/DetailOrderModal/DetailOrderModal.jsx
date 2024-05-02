import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import OrderItem from '../OrderItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatusOrder } from '~/apis/orders.api'
import { toast } from 'sonner'

function DetailOrderModal({ order }) {
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState(false)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => updateStatusOrder(order.user._id, order._id, data),
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
      <a className='font-medium text-green-600 hover:underline cursor-pointer' onClick={() => setOpenModal(true)}>
        Chi tiết đơn hàng
      </a>
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

export default DetailOrderModal
