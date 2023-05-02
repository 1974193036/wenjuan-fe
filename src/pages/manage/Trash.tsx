import { useTitle } from 'ahooks'
import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Spin, Empty, Button, Space, Table, Tag, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { Title } = Typography
const { confirm } = Modal

const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '4月27日 15:16'
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: '4月28日 15:16'
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 15,
    createAt: '4月29日 15:16'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 25,
    createAt: '4月30日 15:16'
  }
]

const Trash: FC = () => {
  useTitle('小慕问卷 - 回收站')

  const [questionList, setQuestionList] = useState(rowQuestionList)

  // 记录选中的 id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后不可以找回',
      onOk: deleteQuestion
    })
  }

  const deleteQuestion = async () => {
    console.log(selectedIds)
    setSelectedIds([])
    await new Promise((r) => {
      setTimeout(() => {
        r(1)
      }, 4000)
    })
  }

  const recover = () => {
    console.log(selectedIds)
    setSelectedIds([])
  }

  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
      // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt'
    }
  ]

  // 可以把 JSX 片段定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={rowQuestionList}
          columns={tableColumns}
          pagination={false}
          rowKey={(q) => q._id}
          rowSelection={{
            type: 'checkbox',
            hideSelectAll: false,
            onChange: (selectedRowKeys) => {
              // console.log(selectedRowKeys)
              setSelectedIds(selectedRowKeys as string[])
            }
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Trash
