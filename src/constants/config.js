let apiRoot = ''
if (process.env.BUILD_MODE === 'prod') {
  apiRoot = 'https://laptop-kt-store.up.railway.app'
}
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:3000'
}

const config = {
  baseURL: apiRoot
}

export default config
