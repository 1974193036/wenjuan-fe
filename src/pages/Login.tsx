import React, { FC, useEffect } from 'react'
import { useRequest, useTitle } from 'ahooks'
import styles from './Login.module.scss'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { Link, useNavigate } from 'react-router-dom'
import { getUserInfoService, loginService } from '@/services/user'
import { setToken as setStorageToken } from '@/utils/user-token'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

type FormValues = {
  username: string
  password: string
  remember: boolean
}

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {
  useTitle('小慕问卷 - 登录')
  const nav = useNavigate()

  const [form] = Form.useForm()

  useEffect(() => {
    const { username = '', password = '' } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const dispatch = useDispatch()

  const { loading, run: onFinish } = useRequest(
    async (values: FormValues) => {
      const { username, password } = values
      const data = await loginService({ username, password })
      return {
        token: data.token,
        formValues: values
      }
    },
    {
      manual: true,
      async onSuccess(res) {
        const { formValues, token = '' } = res
        message.success('登录成功')
        // 存储token
        setStorageToken(token)
        nav({
          pathname: MANAGE_INDEX_PATHNAME
        })

        // 登录后同步用户信息到redux中
        try {
          const data = await getUserInfoService()
          const { username, nickname } = data
          // 把用户信息存储到redux中
          dispatch(loginReducer({ username, nickname }))
        } finally {
          /* empty */
        }

        // 记住密码
        const { username, password, remember } = formValues || {}
        if (remember) {
          rememberUser(username, password)
        } else {
          deleteUserFromStorage()
        }
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
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div style={{ width: '400px' }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
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
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
