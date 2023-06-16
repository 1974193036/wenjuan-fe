import React, { FC } from 'react'
import { useRequest, useTitle } from 'ahooks'
import styles from './Register.module.scss'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import { Link, useNavigate } from 'react-router-dom'
import { registerService } from '@/services/user'

const { Title } = Typography

type FormValues = {
  username: string
  password: string
  confirm: string
  nickname?: string
}

const Register: FC = () => {
  useTitle('小慕问卷 - 注册')
  const nav = useNavigate()

  const { loading, run: onFinish } = useRequest(
    async (values: FormValues) => {
      const { username, password, nickname } = values
      await registerService({ username, password, nickname })
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功，去登录')
        nav({
          pathname: LOGIN_PATHNAME
        })
      }
    }
  )

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div style={{ width: '400px' }}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            validateFirst={true}
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']} // 依赖于 password ，password 变化，会重新触发校验 validator
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
