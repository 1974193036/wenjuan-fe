import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Typography, Spin, Button, Empty } from 'antd'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant'
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

  const [usp] = useSearchParams()

  const [isStarted, setIsStarted] = useState(false) // 是否已经开始加载，防抖有延迟时间
  const [page, setPage] = useState(1) // list内部的数据，不在url参数中体现
  const [list, setList] = useState<ListItemType[]>([]) // 全部的列表数据，上滑加载更多，累计
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  // 真正加载
  // manual: true 手动触发
  const { run: load, loading = true } = useRequest(
    async () => {
      const data = await getQuestionListService({
        keyword: usp.get(LIST_SEARCH_PARAM_KEY) || '',
        page,
        pageSize: LIST_PAGE_SIZE
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
        setIsStarted(false)
      },
      onError() {
        setIsStarted(false)
      }
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  // 触发加载，防抖
  // useDebounceFn内部做了处理，可以拿到最新的函数上下文中的数据，包含最新的page
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return
      const domRect = elem.getBoundingClientRect()
      if (!domRect) return
      const { bottom } = domRect
      // isStarted: 加锁，已经开始加载了（加载中），再次上滑的时候，不再继续请求后台
      if (bottom < document.body.clientHeight && !isStarted) {
        console.log('滚动到底部了，...tryLoadMore...')
        setIsStarted(true)
        load()
      }
    },
    {
      wait: 1000
    }
  )

  // 1. 当页面加载，或者url参数（keyword）发生改变时，触发加载
  useEffect(() => {
    setList([])
    setTotal(0)
    setPage(1)
    setIsStarted(false)
    tryLoadMore()
  }, [usp])

  // 2. 当页面滚动时，触发加载
  useEffect(() => {
    // haveMoreData有数据的时候，可以监听滚动事件
    // 当没有更多数据的时候，即haveMoreData为false，先销毁scroll事件，不再继续监听scroll事件
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      console.log('销毁scroll事件，这里很重要')
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [usp, haveMoreData])

  const loadMoreContentElem = useMemo(() => {
    if (!haveMoreData && total > 0) return <span>没有更多了...</span>
    if (!isStarted || loading) return <Spin></Spin>
    if (total === 0) return <Empty description="暂无数据"></Empty>
    return <span>开始加载下一页</span>
  }, [haveMoreData, total, isStarted, loading])

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
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
