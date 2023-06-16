import { request } from './ajax'

// 获取用户信息
export function getUserInfoService() {
  return request<{
    username: string
    nickname: string
  }>({
    url: '/api/user/info',
    method: 'get'
  })
}

// 注册
export function registerService(data: { username: string; password: string; nickname?: string }) {
  if (!data.nickname) data.nickname = data.username
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

// 登录
export function loginService(data: { username: string; password: string }) {
  return request<{ token: string }>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}
