import { Badge, Button, Modal, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { modalTheme, tableTheme } from '~/utils/theme'

function Product({ setProgress }) {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
            <Table.HeadCell>Loại sản phẩm</Table.HeadCell>
            <Table.HeadCell>Giá tiền</Table.HeadCell>
            <Table.HeadCell>Tình trạng</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index} className='bg-white dark:border-gray-700'>
                <Table.Cell className='font-medium text-gray-900 max-w-sm'>
                  Laptop Dell Precision 7780 Core i9-13950HX - RAM 64GB - SSD 1TB - NVIDIA RTX 3500 Ada - Màn 17.3 FHD+
                </Table.Cell>
                <Table.Cell>Dell Precision</Table.Cell>
                <Table.Cell>20.000.000 VNĐ</Table.Cell>
                <Table.Cell>
                  <Badge color='success'>Còn hàng</Badge>
                </Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <a className='font-medium text-green-600 hover:underline' onClick={() => setOpenModal(true)}>
                    Chi tiết
                  </a>
                  <Modal theme={modalTheme} show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Thông tin chi tiết sản phẩm</Modal.Header>
                    <Modal.Body>
                      <div className='space-y-6'>
                        <p className='text-sm leading-relaxed text-gray-500'>
                          Laptop Dell Precision 7780 Core i9-13950HX - RAM 64GB - SSD 1TB - NVIDIA RTX 3500 Ada - Màn
                          17.3
                        </p>
                        <div className='flex gap-3 justify-center'>
                          <img
                            src='https://laptopkhanhtran.vn/pic/product/Dell-prec_638350344862712773-w.250-q.80.png'
                            alt='Dell Precision 7780'
                            className='w-20 h-20 object-contain'
                          />
                          <img
                            src='https://laptopkhanhtran.vn/pic/product/Dell-prec_638350344862712773-w.250-q.80.png'
                            alt='Dell Precision 7780'
                            className='w-20 h-20 object-contain'
                          />
                        </div>
                        <p className='text-sm leading-relaxed text-gray-500'>Loại sản phẩm: Dell Precision</p>
                        <p className='text-sm leading-relaxed text-gray-500'>Giá tiền: 20.000.000 VNĐ</p>
                        <p className='text-sm leading-relaxed text-gray-500'>Tình trạng: Còn hàng</p>
                        <p className='text-sm leading-relaxed text-gray-500'>RAM 32GB, 1x32GB 5600MT/s CAMM, non-ECC</p>
                        <p className='text-sm leading-relaxed text-gray-500'>SSD 1TB M.2 PCIe NVMe Class 40</p>
                        <p className='text-sm leading-relaxed text-gray-500'>NVIDIA RTX 3500 Ada</p>
                        <p className='text-sm leading-relaxed text-gray-500'>Màn 17.3 FHD+</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={() => setOpenModal(false)}>Cập nhật</Button>
                      <Button color='gray' onClick={() => setOpenModal(false)}>
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <a className='font-medium text-cyan-600 hover:underline'>Cập nhật</a>
                  <a className='font-medium text-red-600 hover:underline'>Xóa</a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Product
