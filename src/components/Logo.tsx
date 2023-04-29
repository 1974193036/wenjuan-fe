import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import styles from './Logo.module.scss'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME } from '../router/index'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATHNAME}>
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
