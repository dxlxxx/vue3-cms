import { localCache } from '@/utils'
import XLRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const xlRequest = new XLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 实例的拦截器
  interceptors: {
    requestInterceptors(config) {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorsCatch(err) {
      return err
    },
    responseInterceptors(res) {
      return res
    },
    responseInterceptorsCatch(err) {
      return err
    }
  }
})

export { xlRequest }
