import { AxiosInstance } from 'axios'
import axios from 'axios'
import { Interceptors, XLRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

// 默认开启loading
let DEAFULT_LOADING = true

class XLRequest {
  instance: AxiosInstance
  interceptors?: Interceptors
  loading?: LoadingInstance
  isShowLoading: boolean

  constructor(config: XLRequestConfig) {
    this.instance = axios.create(config)
    if (config.isShowLoading !== undefined) {
      this.isShowLoading = config.isShowLoading
      DEAFULT_LOADING = config.isShowLoading
    } else {
      this.isShowLoading = DEAFULT_LOADING
    }
    this.interceptors = config.interceptors

    // 全局的拦截器 执行顺序看位置
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
  }
  request<T = any>(config: XLRequestConfig<T>) {
    return new Promise<T>((resolve, reject) => {
      // 提供单次请求的拦截器
      // 这里是自己实现，不是同个axios添加到实例或者全局
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      if (config.isShowLoading === false) {
        this.isShowLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 好像有bug
          this.isShowLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.isShowLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }
  get<T = any>(config: XLRequestConfig<T>) {
    return this.request({ ...config, method: 'get' })
  }
  post<T = any>(config: XLRequestConfig<T>) {
    return this.request({ ...config, method: 'post' })
  }
  delete<T = any>(config: XLRequestConfig<T>) {
    return this.request({ ...config, method: 'delete' })
  }
  patch<T = any>(config: XLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default XLRequest
