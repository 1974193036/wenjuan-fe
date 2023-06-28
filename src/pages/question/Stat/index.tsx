// import { getQuestionService } from '@/services/question'
import { useTitle } from 'ahooks'
import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import StatHeader from './StatHeader'

const Stat: FC = () => {
  const nav = useNavigate()

  const { loading } = useLoadQuestionData()

  const { title, isPublished } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)

  const LoadingElem = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin></Spin>
      </div>
    )
  }

  const ContentElem = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>left</div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? (
          <LoadingElem />
        ) : (
          <div className={styles.content}>
            <ContentElem />
          </div>
        )}
      </div>
    </div>
  )
}

export default Stat
