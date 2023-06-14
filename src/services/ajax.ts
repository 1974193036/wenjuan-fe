import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type ResDataType<T = any> = {
  errno: number
  data?: T
  msg?: string
}

const instance = axios.create({
  timeout: 10 * 1000
})

instance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Bearer ${getToken()}` // JWT 的固定格式
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response: AxiosResponse<ResDataType>) => {
    const resData = response.data
    const { errno, msg } = resData

    if (errno === 0) {
      return response
    }

    if (msg) {
      message.error(msg)
    }

    return Promise.reject(response.data)
  },
  (err) => {
    return Promise.reject(err)
  }
)

export function request<T = any>(config: AxiosRequestConfig) {
  return instance(config).then((response: AxiosResponse<ResDataType<T>>) => {
    return response.data.data as T
  })
}

export default instance
