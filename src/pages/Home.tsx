import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import styles from './Home.module.scss'
import { Divider, Typography } from 'antd'
const { Title, Paragraph } = Typography
import { MANAGE_INDEX_PATHNAME } from '../router'

const Home: FC = () => {
  const nav = useNavigate()
  // const login = () => {
  //   nav('/login')
  // }

  return (
    // <div>
    //   <p>Home</p>
    //   <div>
    //     <Button type="primary" onClick={login}>
    //       登录
    //     </Button>
    //     <Link to="/register">注册</Link>
    //   </div>
    // </div>
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
