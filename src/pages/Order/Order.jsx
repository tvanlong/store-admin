import { Badge, Button, Modal, Table } from 'flowbite-react'
import { useState } from 'react'
import { modalTheme, tableTheme } from '~/utils/theme'

function Order() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách đơn hàng
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các đơn hàng đã được đặt hàng trên hệ thống
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
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
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>DH200123</Table.Cell>
                <Table.Cell>Nguyễn Văn A</Table.Cell>
                <Table.Cell>12/08/2021 12:00</Table.Cell>
                <Table.Cell>1.200.000đ</Table.Cell>
                <Table.Cell>
                  <Badge color='success'>Đã giao</Badge>
                </Table.Cell>
                <Table.Cell>
                  <a className='font-medium text-green-600 hover:underline' onClick={() => setOpenModal(true)}>
                    Chi tiết
                  </a>
                  <Modal theme={modalTheme} show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Thông tin chi tiết đơn hàng</Modal.Header>
                    <Modal.Body>
                      <div className='space-y-6 border border-gray-200 rounded-lg my-2 p-5'>
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
                      <div className='space-y-6 border border-gray-200 rounded-lg my-2 p-5'>
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
                      <Button color='gray' onClick={() => setOpenModal(false)}>
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
