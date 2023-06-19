import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import { useLoadUserInfo } from '@/hooks/useUserInfo'
import { useNavPage } from '@/hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserInfo } = useLoadUserInfo()
  useNavPage(waitingUserInfo)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserInfo ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin></Spin>
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>小慕问卷 &copy;2023 - present. Created by 老师</Footer>
    </Layout>
  )
}

export default MainLayout
