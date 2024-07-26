import PropTypes from 'prop-types'

function StatusFilter({ options, onStatusChange }) {
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value
    onStatusChange(selectedStatus)
  }

  return (
    <div className='w-48 sm:w-64 xl:w-96'>
      <select
        id='statusFilter'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
        defaultValue=''
        onChange={(e) => handleStatusChange(e)}
      >
        <option value='' disabled>
          Chọn trạng thái đơn hàng
        </option>
        {options.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

StatusFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStatusChange: PropTypes.func.isRequired
}

export default StatusFilter
