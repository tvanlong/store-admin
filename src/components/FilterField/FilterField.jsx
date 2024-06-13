function FilterField({ options, onSortChange, defaultLabel = 'Bộ lọc tìm kiếm' }) {
  const handleSort = (e) => {
    const selectedOption = options.find((option) => option.value.toString() === e.target.value)
    if (selectedOption) {
      onSortChange(selectedOption.param, selectedOption.value)
    }
  }

  return (
    <div className='flex-1'>
      <select
        id='countries'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
        defaultValue=''
        onChange={(e) => handleSort(e)}
      >
        <option value='' disabled>
          {defaultLabel}
        </option>
        {options.map((option) => (
          <option key={`${option.param}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterField
