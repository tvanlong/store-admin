import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteSubcategory } from '~/apis/subcategories.api'
import NoData from '~/components/NoData'
import { useSubcategories } from '~/hooks/useSubcategories'
import { tableTheme } from '~/utils/theme'

function Subcategory({ setProgress }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useSubcategories()
  const subcategories = data?.data.data || []

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: deleteSubcategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    }
  })

  const handleDeleteSubcategory = (subcategory) => {
    if (subcategory.products.length > 0) {
      return toast.error('Không thể xóa danh mục sản phẩm này!')
    }

    toast.promise(mutateAsync(subcategory._id), {
      loading: 'Đang tiến hành xóa danh mục sản phẩm...',
      success: () => 'Xóa danh mục sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa danh mục sản phẩm thất bại'
      }
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <Helmet>
        <title>Danh mục sản phẩm nhỏ | Trang quản trị lưu trữ danh mục sản phẩm nhỏ</title>
        <meta name='description' content='Trang quản trị | Danh mục sản phẩm nhỏ' />
      </Helmet>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh mục sản phẩm nhỏ
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các danh mục sản phẩm nhỏ hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên danh mục nhỏ</Table.HeadCell>
            <Table.HeadCell>Thuộc danh mục</Table.HeadCell>
            <Table.HeadCell>Số lượng sản phẩm</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {subcategories.map((subcategory) => (
              <Table.Row key={subcategory._id} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{subcategory.name}</Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>
                  {subcategory.category.name}
                </Table.Cell>
                <Table.Cell>
                  <span className='text-sm font-medium text-gray-900'>{subcategory.products.length || 0}</span>
                </Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link
                    to={`/update-subcategory/${subcategory._id}`}
                    className='font-medium text-cyan-600 hover:underline'
                  >
                    Cập nhật
                  </Link>
                  <Link
                    to={''}
                    className='font-medium text-red-600 hover:underline'
                    onClick={() => handleDeleteSubcategory(subcategory)}
                  >
                    Xóa
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default Subcategory
