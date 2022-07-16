/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
interface Interceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (err: any) => any
}
interface XLRequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptors
}

export { XLRequestConfig, Interceptors }
