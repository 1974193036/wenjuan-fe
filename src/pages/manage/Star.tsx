import { useTitle } from 'ahooks'
import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Typography, Spin, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
const { Title } = Typography

const rowQuestionList = [
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: '4月28日 15:16'
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: true,
    answerCount: 25,
    createAt: '4月30日 15:16'
  }
] as {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
}[]

const Star: FC = () => {
  useTitle('小慕问卷 - 星标问卷')

  const [questionList, setQuestionList] = useState(rowQuestionList)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((item) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
