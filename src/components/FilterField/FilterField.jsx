function FilterField({ options, onSortChange }) {
  const handleSort = (value) => {
    onSortChange(value)
  }

  return (
    <div className='flex-1'>
      <select
        id='countries'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5'
        defaultValue=''
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value='' disabled>
          Bộ lọc tìm kiếm
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterField
