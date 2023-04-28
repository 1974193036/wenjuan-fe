import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'

const Login: FC = () => {
  useTitle('小慕问卷 - 登录')

  const nav = useNavigate()

  return (
    <div>
      <p>Login</p>
      <button onClick={() => nav(-1)}>返回</button>
    </div>
  )
}

export default Login
