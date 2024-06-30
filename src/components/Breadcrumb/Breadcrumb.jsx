import { Breadcrumb as BreadcrumbComponent } from 'flowbite-react'
import PropTypes from 'prop-types'
import { HiHome } from 'react-icons/hi'

function Breadcrumb({ location }) {
  return (
    <BreadcrumbComponent className='mb-5'>
      <BreadcrumbComponent.Item href='/' icon={HiHome}>
        Trang chủ
      </BreadcrumbComponent.Item>
      <BreadcrumbComponent.Item href='/'>Quản trị</BreadcrumbComponent.Item>
      <BreadcrumbComponent.Item>{location}</BreadcrumbComponent.Item>
    </BreadcrumbComponent>
  )
}

Breadcrumb.propTypes = {
  location: PropTypes.string
}

export default Breadcrumb
