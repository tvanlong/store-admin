import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import subcategoriesApi from '~/apis/subcategories.api'
import ModalDelete from '~/components/ModalDelete'
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
    mutationFn: subcategoriesApi.deleteSubcategory,
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

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['subcategory', id],
      queryFn: () => subcategoriesApi.getSubcategory(id)
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh mục sản phẩm nhỏ | Trang quản trị lưu trữ danh mục sản phẩm nhỏ</title>
        <meta name='description' content='Trang quản trị | Danh mục sản phẩm nhỏ' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-3xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh mục sản phẩm nhỏ
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các danh mục sản phẩm nhỏ hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='mx-10 overflow-x-auto'>
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
              <Table.Row
                key={subcategory._id}
                className='bg-white'
                onMouseEnter={() => handlePrefetchOnMouseEnter(subcategory._id)}
              >
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
                  <ModalDelete
                    title='Bạn có chắc chắn muốn xóa danh mục sản phẩm này không?'
                    handleDelete={() => handleDeleteSubcategory(subcategory)}
                  />
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
