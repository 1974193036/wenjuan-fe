// import { isLoginOrRegister } from '@/router'
import { getToken } from '@/utils/user-token'
import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { useLocation } from 'react-router-dom'

type ResDataType<T = any> = {
  errno: number
  data?: T
  msg?: string
}

const instance = axios.create({
  timeout: 10 * 1000
})

// function isNeedErrorMsg(url: string | undefined) {
//   const pathname = window.location.pathname
//   if (isLoginOrRegister(pathname) && url === '/api/user/info') {
//     // 如果在登录或者注册页面，并且调用获取用户信息的接口，是不需要错误提示语
//     return false
//   }
//   return true
// }

instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}` // JWT 的固定格式
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
      // if (isNeedErrorMsg(response.config.url)) {
      //   message.error(msg)
      // }
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
