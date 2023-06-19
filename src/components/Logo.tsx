import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import styles from './Logo.module.scss'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import { useGetUserInfo } from '@/hooks/useUserInfo'

const { Title } = Typography

const Logo: FC = () => {
  const { username } = useGetUserInfo() // 从 redux 中获取用户信息

  return (
    <div className={styles.container}>
      <Link to={username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
