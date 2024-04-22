import http from '~/utils/http'

export const getAllVersions = () => http.get('/api/versions')
