import { Table } from 'flowbite-react'
import { useMemo } from 'react'
import { useOrders } from '~/hooks/useOrders'
import { tableTheme } from '~/utils/theme'

function SellingTable() {
  const { data: ordersData } = useOrders()
  const orders = useMemo(() => ordersData?.data.data, [ordersData])

  const bestSeller = useMemo(() => {
    const versionCount = {}

    orders?.forEach((order) => {
      order.items.forEach((item) => {
        const versionId = item.version._id
        const quantity = item.quantity
        if (versionCount[versionId]) {
          versionCount[versionId] += quantity
        } else {
          versionCount[versionId] = quantity
        }
      })
    })

    const sortedVersions = Object.entries(versionCount)
      .map(([versionId, count]) => ({ versionId, count }))
      .sort((a, b) => b.count - a.count)

    const bestSellingVersions = sortedVersions.map((version) => {
      let versionDetails
      orders?.some((order) => {
        versionDetails = order.items.find((item) => item.version._id === version.versionId)?.version
        return versionDetails
      })
      return { ...version, details: versionDetails }
    })

    return bestSellingVersions
  }, [orders])

  return (
    <div className='col-span-8 overflow-hidden rounded-lg border border-gray-100'>
      <div className='flex items-center gap-3 bg-gray-200 p-3'>
        <svg className='h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 4.5V19c0 .6.4 1 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.2M20 9v3.2'
          />
        </svg>
        <h2 className='text-sm font-bold'>Top 5 sản phẩm bán chạy nhất</h2>
      </div>
      <div className='rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1'>
        <Table theme={tableTheme}>
          <Table.Head>
            <Table.HeadCell>Sản phẩm</Table.HeadCell>
            <Table.HeadCell>Ảnh sản phẩm</Table.HeadCell>
            <Table.HeadCell>Doanh thu</Table.HeadCell>
            <Table.HeadCell>Số lượng</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {bestSeller?.length > 0 ? (
              bestSeller?.slice(0, 5).map((version) => (
                <Table.Row key={version.versionId} className='bg-white'>
                  <Table.Cell className='max-w-sm font-medium text-gray-900'>
                    <span className='line-clamp-2'>
                      {version.details?.product.name} ({version.details?.name})
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-3'>
                      {version.details?.product.images.slice(0, 2).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={version.details?.product.name}
                          className='h-16 w-16 rounded-lg border border-gray-300 object-cover'
                        />
                      ))}
                      {version.details?.product.images.length > 2 && (
                        <div className='flex h-16 w-16 items-center justify-center rounded-lg border border-gray-300'>
                          <span className='text-gray-400'>+{version.details?.product.images.length - 2}</span>
                        </div>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(version.count * version.details?.current_price)}
                  </Table.Cell>
                  <Table.Cell>{version.count < 10 ? `0${version.count}` : `${version.count}`}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={5} className='text-center'>
                  Không có dữ liệu
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default SellingTable
