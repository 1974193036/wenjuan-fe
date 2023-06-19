import { useEffect } from 'react'
import { useGetUserInfo } from './useUserInfo'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * 路由权限
 */
export function useNavPage(waitingUserInfo: boolean) {
  const { username } = useGetUserInfo() // 从 redux 中获取用户信息
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserInfo) {
      // 如果还在加载用户信息的接口，就什么都不做
      return
    }

    // 如果已经登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        // 如果当前页面是登录或者注册页面
        // 跳转到/manage/list
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 如果未登录
    if (isNoNeedUserInfo(pathname)) {
      // 如果当前页面是登录或者注册页面，或者首页/
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserInfo, pathname, username])
}
