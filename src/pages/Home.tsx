import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import styles from './Home.module.scss'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography
import { MANAGE_INDEX_PATHNAME } from '../router'

import axios from 'axios'

const Home: FC = () => {
  const nav = useNavigate()
  // const login = () => {
  //   nav('/login')
  // }

  useEffect(() => {
    // fetch('/api/test')
    //   .then((res) => res.json())
    //   .then((data) => console.log('fetch data', data))
    // mock.js 只能劫持 XMLHttpRequest ，不能劫持 fetch
    // axios 内部使用 XMLHttpRequest API ，没用 fetch
    axios.get('/api/test').then((res) => console.log('axios data', res.data))
  }, [])

  return (
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
