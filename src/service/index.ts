import XLRequest from './request'
import { BASE_URL } from './request/config'

const xlRequest = new XLRequest({
  baseURL: BASE_URL,
  // 实例的拦截器
  interceptors: {
    requestInterceptors(config) {
      console.log('请求实例的拦截器')
      return config
    },
    requestInterceptorsCatch(err) {
      console.log(err, '请求错误实例的拦截器')
    },
    responseInterceptors(res) {
      console.log(res, '响应成功实例的拦截器')
      return res
    },
    responseInterceptorsCatch(err) {
      console.log(err, '响应错误实例的拦截器')
    }
  }
})

export { xlRequest }
