import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function ModalDelete({ title, handleDelete }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button className='font-medium text-red-600 hover:underline' onClick={() => setOpenModal(true)}>
        Xóa
      </button>
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

export default ModalDelete
