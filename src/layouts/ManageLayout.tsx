import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Space, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { createQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 改造成useRequest
  // manual: true 手动触发
  const { loading, run: handleCreate } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      // console.log(result)
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    }
  })

  // const [loading, setLoading] = useState(false)
  // const handleCreate = async () => {
  //   try {
  //     setLoading(true)
  //     const data = await createQuestionService()
  //     const { id } = data || {}
  //     if (id) {
  //       nav(`/question/edit/${id}`)
  //       message.success('创建成功')
  //     }
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical" size="middle">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={handleCreate}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
