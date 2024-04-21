import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { tableTheme } from '~/utils/theme'

function Staff({ setProgress }) {
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
            Danh sách nhân viên
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các nhân viên đã đăng ký tài khoản trên hệ thống
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên nhân viên</Table.HeadCell>
            <Table.HeadCell>Địa chỉ hiện tại</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>Nguyễn Văn A</Table.Cell>
                <Table.Cell>Hà Nội, Việt Nam</Table.Cell>
                <Table.Cell>khachhang@gmail.com</Table.Cell>
                <Table.Cell className='flex gap-5'>
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

export default Staff
