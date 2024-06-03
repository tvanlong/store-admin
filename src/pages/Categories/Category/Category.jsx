import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteCategory, getCategoryById } from '~/apis/categories.api'
import NoData from '~/components/NoData'
import { useCategories } from '~/hooks/useCategories'
import { tableTheme } from '~/utils/theme'

function Category({ setProgress }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useCategories()

  const categories = data?.data.data || []

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
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  const handleDeleteCategory = (category) => {
    if (category.subcategories.length > 0) {
      return toast.error('Không thể xóa danh mục sản phẩm này!')
    }

    toast.promise(mutateAsync(category._id), {
      loading: 'Đang tiến hành xóa danh mục sản phẩm...',
      success: () => 'Xóa danh mục sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa danh mục sản phẩm thất bại'
      }
    })
  }

  const handlePrefetchOnMouseEnter = (id) => {
    queryClient.prefetchQuery({
      queryKey: ['category', id],
      queryFn: () => getCategoryById(id)
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-24 h-full'>
      <Helmet>
        <title>Danh mục sản phẩm | Trang quản trị lưu trữ danh mục sản phẩm</title>
        <meta name='description' content='Trang quản trị | Danh mục sản phẩm' />
      </Helmet>
      <div className='mb-10 mt-20 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent'>
            Danh mục sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các danh mục sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='mx-10 overflow-x-auto'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Tên danh mục</Table.HeadCell>
            <Table.HeadCell>Số lượng danh mục nhỏ</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {categories.map((category) => (
              <Table.Row
                key={category._id}
                className='bg-white'
                onMouseEnter={() => handlePrefetchOnMouseEnter(category._id)}
              >
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900'>{category.name}</Table.Cell>
                <Table.Cell>{category.subcategories.length || 0}</Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link to={`/update-category/${category._id}`} className='font-medium text-cyan-600 hover:underline'>
                    Cập nhật
                  </Link>
                  <Link
                    to={''}
                    className='font-medium text-red-600 hover:underline'
                    onClick={() => handleDeleteCategory(category)}
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

export default Category
