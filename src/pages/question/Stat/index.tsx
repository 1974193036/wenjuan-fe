// import { getQuestionService } from '@/services/question'
import { useTitle } from 'ahooks'
import React, { FC, useState } from 'react'
// import { useParams } from 'react-router-dom'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { Button, Result, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const nav = useNavigate()

  const { loading, data } = useLoadQuestionData()
  // console.log(loading) // false --> true --> false

  // 状态提升 （left、main、right 三个组件都是平级的， 在它们的父组件中维护选中的组件ID和类型，不使用redux）
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  const { title, isPublished } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)

  // loading 效果
  const LoadingElem = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin />
      </div>
    )
  }

  /**
   * 注意：这里不能在调用的时候使用 <GenContentElem /> 的方式
   * 因为Stat每次函数上下文执行的时候，产生一个全新的 const GenContentElem = () => {}
   * 导致产生一个全新的组件 <GenContentElem />，会卸载旧的组件 <GenContentElem /> (内存地址不同)
   * 从而导致<GenContentElem />内部的组件如<PageStat />会出现销毁再创建的过程
   */
  const genContentElem = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin></Spin>
        </div>
      )
    }

    if (data == null) return null

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
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? <LoadingElem /> : <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  )
}

export default Stat
