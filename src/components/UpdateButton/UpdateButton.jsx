import { Button } from 'flowbite-react'
import PropTypes from 'prop-types'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

function UpdateButton({ path }) {
  const navigate = useNavigate()

  return (
    <Button
      size='xs'
      className='bg-blue-600 hover:bg-blue-600 text-white'
      onClick={() => {
        navigate(path)
      }}
    >
      <HiOutlinePencilAlt className='mr-2 h-5 w-5' />
      Cập nhật
    </Button>
  )
}

UpdateButton.propTypes = {
  path: PropTypes.string
}

export default UpdateButton
