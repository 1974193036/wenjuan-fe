import { useTitle } from 'ahooks'
import React, { FC } from 'react'
import styles from './common.module.scss'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData'
const { Title } = Typography

type ListItemType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

const Star: FC = () => {
  useTitle('小慕问卷 - 星标问卷')

  // 改造成useRequest
  const { loading, data } = useLoadQuestionListData({ isStar: true })

  let list: ListItemType[] = []
  let total = 0
  if (data) {
    list = data.list
    total = data.total
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>分页 {total}</div>
    </>
  )
}

export default Star
