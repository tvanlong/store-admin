import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

function useQueryParamsConfig() {
  const [searchParams] = useSearchParams()
  const queryParams = Object.fromEntries([...searchParams])
  const queryParamsConfig = {
    sort: queryParams.sort || 'createdAt',
    order: queryParams.order || 'desc',
    search: queryParams.search
  }
  const filteredQueryParamsConfig = omitBy(queryParamsConfig, (value) => isUndefined(value) || value === '')
  return filteredQueryParamsConfig
}

export default useQueryParamsConfig
