import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

function useQueryParamsConfig() {
  const [searchParams] = useSearchParams()
  const queryParams = Object.fromEntries([...searchParams])
  const queryParamsConfig = {
    sort: queryParams.sort || 'createdAt',
    order: queryParams.order || 'desc',
    keyword: queryParams.keyword,
    price_min: queryParams.price_min,
    price_max: queryParams.price_max
  }
  const filteredQueryParamsConfig = omitBy(queryParamsConfig, (value) => isUndefined(value) || value === '')
  return filteredQueryParamsConfig
}

export default useQueryParamsConfig
