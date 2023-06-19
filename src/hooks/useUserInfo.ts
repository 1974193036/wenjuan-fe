import { getUserInfoService } from '@/services/user'
import { StateType } from '@/store'
import { loginReducer, logoutReducer } from '@/store/userReducer'
import { getToken, removeToken } from '@/utils/user-token'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * 获取用户信息
 * 从redux中取出用户信息
 */
export function useGetUserInfo() {
  // 从redux中取出用户信息
  const data = useSelector<StateType>((state) => state.user) as StateType['user']
  const { username, nickname } = data
  return { username, nickname }
}

/**
 * 把接口中的用户信息存储到redux中
 */
export function useLoadUserInfo() {
  const [waitingUserInfo, setWaitingUserInfo] = useState(true)

  const { username } = useGetUserInfo()

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      if (username) {
        setWaitingUserInfo(false)
        return
      }
      if (!getToken()) {
        setWaitingUserInfo(false)
        return
      }
      try {
        const data = await getUserInfoService()
        const { username, nickname } = data
        // 把用户信息存储到redux中
        dispatch(loginReducer({ username, nickname }))
      } catch (e) {
        console.log(e)
        removeToken()
        dispatch(logoutReducer())
      } finally {
        setWaitingUserInfo(false)
      }
    })()
  }, [username])

  return {
    waitingUserInfo
  }
}
