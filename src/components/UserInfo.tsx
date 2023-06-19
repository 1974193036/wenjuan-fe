import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '@/utils/user-token'
import { useGetUserInfo } from '@/hooks/useUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()

  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo() // 从 redux 中获取用户信息

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutReducer())
    removeToken() // 清除token
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfoPart = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const LoginPart = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfoPart : LoginPart}</div>
}

export default UserInfo
