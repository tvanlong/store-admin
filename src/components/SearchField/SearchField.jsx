import PropTypes from 'prop-types'

function SearchField({ loading, setLoading, searchValue, setSearchValue, placeholder = 'Tìm kiếm...' }) {
  const handleSearch = (e) => {
    const value = e.target.value.trimStart()
    setLoading(true)
    setSearchValue(value)
  }

  return (
    <>
      <form className='sm:pr-3 relative'>
        <label htmlFor='products-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-48 mt-1 sm:w-64 xl:w-96'>
          <button type='submit' className='absolute inset-y-0 start-0 flex cursor-pointer items-center ps-3'>
            <svg
              className='h-4 w-4 text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </button>
          <input
            type='text'
            name='email'
            id='products-search'
            value={searchValue}
            onChange={(e) => handleSearch(e)}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 pl-10'
            placeholder={placeholder}
          />
          {loading && (
            <div className='pointer-events-none absolute inset-y-0 end-4 flex items-center ps-3'>
              <svg
                aria-hidden='true'
                className='inline h-4 w-4 animate-spin fill-blue-600 text-gray-200'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          )}
          {!!searchValue && !loading && (
            <div
              className='absolute inset-y-0 end-4 flex cursor-pointer items-center ps-3'
              onClick={() => setSearchValue('')}
            >
              <svg
                className='h-4 w-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
        </div>
      </form>
    </>
  )
}

SearchField.propTypes = {
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  placeholder: PropTypes.string
}

export default SearchField
