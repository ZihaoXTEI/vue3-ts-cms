// service 统一出口
import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/localcache'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default myRequest
