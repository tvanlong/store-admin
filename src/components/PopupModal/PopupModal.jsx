import { Button, Checkbox, Label, Modal } from 'flowbite-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { formatCurrency, formatDateTime } from '~/utils/format'

function PopupModal({ version, isDeleted = false, restoreFunc = () => {} }) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Button size='xs' className='bg-green-600 hover:bg-green-600 text-white' onClick={() => setOpenModal(true)}>
        <HiOutlineSearchCircle className='mr-2 h-5 w-5' />
        Chi tiết
      </Button>
      <Modal show={openModal} size='3xl' onClose={() => setOpenModal(false)}>
        <Modal.Header>Thông tin chi tiết phiên bản sản phẩm</Modal.Header>
        <Modal.Body>
          <div className='space-y-6 p-6'>
            <div className='flex items-center justify-center gap-3'>
              {version.product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={version.product.name}
                  className='h-20 w-20 rounded-lg border border-gray-300 object-cover'
                />
              ))}
            </div>
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Tên sản phẩm:</span> {version.product.name} ({version.name})
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
            {version.is_featured && (
              <div className='flex items-center gap-2 mb-5'>
                <Checkbox id='is_featured' checked={version.is_featured} />
                <Label className='text-base font-medium' htmlFor='is_featured'>
                  Sản phẩm nổi bật
                </Label>
              </div>
            )}
            <p className='text-base leading-relaxed'>
              <span className='font-medium'>Tình trạng:</span>{' '}
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${
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
          {isDeleted ? (
            <Button color='yellow' onClick={() => restoreFunc(version.id)}>
              Khôi phục
            </Button>
          ) : (
            <Button onClick={() => setOpenModal(false)}>Cập nhật</Button>
          )}
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

PopupModal.propTypes = {
  version: PropTypes.object
}

export default PopupModal
