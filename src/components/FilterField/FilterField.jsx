function FilterField({ options, onSortChange }) {
  const handleSort = (e) => {
    const selectedOption = options.find((option) => option.value === e.target.value)
    if (selectedOption) {
      onSortChange(selectedOption.sort_by, selectedOption.value)
    }
  }

  return (
    <div className='flex-1'>
      <select
        id='countries'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5'
        defaultValue=''
        onChange={(e) => handleSort(e)}
      >
        <option value='' disabled>
          Bộ lọc tìm kiếm
        </option>
        {options.map((option) => (
          <option key={option.sort_by + option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterField
