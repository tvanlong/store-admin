import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import config from '~/constants/config'
import { formatCurrency, formatDateTime } from '~/utils/format'

function PopupModal({ version }) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Link className='font-medium text-green-600 hover:underline' onClick={() => setOpenModal(true)}>
        Chi tiết
      </Link>
      <Modal show={openModal} size='3xl' onClose={() => setOpenModal(false)}>
        <Modal.Header>Thông tin chi tiết phiên bản sản phẩm</Modal.Header>
        <Modal.Body>
          <div className='space-y-6 p-6'>
            <div className='flex items-center justify-center gap-3'>
              {version.product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.baseURL}/api/upload/${image}`}
                  alt={version.product.name}
                  className='w-20 h-20 object-cover rounded-lg border border-gray-300'
                />
              ))}
            </div>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Tên sản phẩm:</span> {version.product.name} {version.name}
            </p>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Loại sản phẩm:</span> {version.product.subcategory.name}
            </p>
            {version.description.map((desc, index) => {
              const spec = desc.split(':')
              return (
                <p key={index} className='text-base leading-relaxed'>
                  <span className='font-medium'>{spec[0]}:</span> {spec[1]}
                </p>
              )
            })}
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Giá cũ:</span> {formatCurrency(version.old_price)} VNĐ
            </p>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Giá hiện tại:</span> {formatCurrency(version.current_price)} VNĐ
            </p>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Tình trạng:</span>{' '}
              <span
                className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
                  version.status === 'Còn hàng' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {version.status}
              </span>
            </p>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Thời gian khởi tạo:</span> {formatDateTime(version.createdAt)}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Cập nhật</Button>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupModal
