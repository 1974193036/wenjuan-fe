import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
// import { useSearchParams } from 'react-router-dom'
import ListSearch from '../../components/ListSearch'
import { useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
const { Title } = Typography

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

const List: FC = () => {
  useTitle('小慕问卷 - 我的问卷')
  // const [usp] = useSearchParams()
  // console.log(usp.get('keyword'))

  const [questionList, setQuestionList] = useState(rowQuestionList)
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
        {questionList.length > 0 &&
          questionList.map((item) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>上滑加载更多</div>
    </>
  )
}

export default List
