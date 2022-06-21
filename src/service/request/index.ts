import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestInterceptors, MyRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEAFULT_LOADING = true

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: MyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 从 config 中取出实例的拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 设置页面加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '请求数据中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        // 关闭页面加载动画
        this.loading?.close()

        const data = res.data
        if (data === '-1001') {
          console.log('请求数据发送错误，请联系网站管理员。')
        } else {
          return data
        }
      },
      (err) => {
        // 关闭页面加载动画
        this.loading?.close()

        if (err.response.status === 404) {
          console.log('请求数据发送错误，请联系网站管理员。')
        }
        return err
      }
    )
  }

  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 恢复是否展示页面加载动画初始值，使其不影响下一个请求
          this.showLoading = DEAFULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 恢复是否展示页面加载动画初始值，使其不影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  // get 请求
  get<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  // post 请求
  post<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  // delete 请求
  delete<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  // patch 请求
  patch<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
