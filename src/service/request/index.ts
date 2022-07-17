import { AxiosInstance } from 'axios'
import axios from 'axios'
import { Interceptors, XLRequestConfig } from './type'
class XLRequest {
  instance: AxiosInstance
  interceptors?: Interceptors
  constructor(config: XLRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }
  request<T>(config: XLRequestConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      // 提供单次请求的拦截器
      // 这里是自己实现，不是同个axios添加到实力或者全局
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default XLRequest
