import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'flowbite-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteImage } from '~/apis/images.api'
import { deleteProduct, getAllProducts } from '~/apis/products.api'
import NoData from '~/components/NoData'
import config from '~/constants/config'
import { tableTheme } from '~/utils/theme'

function Product({ setProgress }) {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  })

  const products = data?.data?.data.docs || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync: deleteImageMutateAsync } = useMutation({
    mutationFn: (name) => deleteImage(name)
  })

  const { mutateAsync: deleteProductMutateAsync } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const handleDeleteProduct = (product) => {
    if (product.versions.length > 0) {
      return toast.error('Không thể xóa dòng sản phẩm này!')
    }

    toast.promise(deleteProductMutateAsync(product._id), {
      loading: 'Đang tiến hành xóa dòng sản phẩm...',
      success: () => 'Xóa dòng sản phẩm thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xóa dòng sản phẩm thất bại'
      }
    })

    product.images.forEach(async (image) => {
      await deleteImageMutateAsync(image)
    })
  }

  if (isLoading) return <NoData />

  return (
    <div className='mt-[68px] h-full'>
      <div className='text-center mt-20 mb-10'>
        <h1 className='mb-4 text-5xl font-extrabold text-gray-900'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
            Danh sách dòng sản phẩm
          </span>
        </h1>
        <p className='text-lg font-normal text-gray-500 lg:text-xl'>
          Danh sách các dòng sản phẩm hiện có trong cửa hàng được hiển thị dưới đây
        </p>
      </div>
      <div className='overflow-x-auto mx-10'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Dòng sản phẩm</Table.HeadCell>
            <Table.HeadCell>Loại danh mục</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {products.map((product) => (
              <Table.Row key={product._id} className='bg-white dark:border-gray-700'>
                <Table.Cell className='font-medium text-gray-900 max-w-sm'>{product.name}</Table.Cell>
                <Table.Cell>{product.subcategory.name}</Table.Cell>
                <Table.Cell>
                  <div className='flex items-center gap-3'>
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${config.baseURL}/api/upload/${image}`}
                        alt={product.name}
                        className='w-20 h-20 object-cover rounded-lg border border-gray-300'
                      />
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell className='flex gap-5'>
                  <Link to={`/update-product/${product._id}`} className='font-medium text-cyan-600 hover:underline'>
                    Cập nhật
                  </Link>
                  <Link
                    className='font-medium text-red-600 hover:underline'
                    onClick={() => handleDeleteProduct(product)}
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

export default Product
