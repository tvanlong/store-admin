import { Button, Modal } from 'flowbite-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { HiOutlineExclamationCircle, HiOutlineTrash } from 'react-icons/hi'

function ModalDelete({ title, handleDelete }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button size='xs' onClick={() => setOpenModal(true)} className='bg-red-600 hover:bg-red-600 text-white'>
        <HiOutlineTrash className='mr-2 h-5 w-5' />
        Xóa
      </Button>
      <Modal className='bg-gray-100/50' show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400' />
            <h3 className='mb-5 text-lg font-normal'>{title}</h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => {
                  setOpenModal(false)
                  handleDelete()
                }}
              >
                Đồng ý
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Hủy bỏ
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalDelete.propTypes = {
  title: PropTypes.string,
  handleDelete: PropTypes.func
}

export default ModalDelete
