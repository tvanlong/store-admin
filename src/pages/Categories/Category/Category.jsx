import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { tableTheme } from '~/utils/theme'

function Category({ setProgress }) {
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
            Danh mục sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các danh mục sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên danh mục</Table.HeadCell>
            <Table.HeadCell>Số lượng danh mục nhỏ</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>Laptop Dell</Table.Cell>
                <Table.Cell>04</Table.Cell>
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

export default Category
