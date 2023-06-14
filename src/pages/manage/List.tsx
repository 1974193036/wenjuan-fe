import React, { FC } from 'react'
import styles from './common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
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

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')

  // 改造成useRequest
  const { loading, data } = useLoadQuestionListData()

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
          <Title level={3}>我的问卷</Title>
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
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上滑加载更多 -- 共 {total} 条数据</div>
    </>
  )
}

export default List
