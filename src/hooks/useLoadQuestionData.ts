import { getQuestionService } from '@/services/question'
import { resetComponents } from '@/store/componentsReducer'
import { resetPageInfo } from '@/store/pageInfoReducer'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// 获取单个问卷信息
export function useLoadQuestionData() {
  const { id = '' } = useParams()

  const dispatch = useDispatch()

  // 改造成useRequest
  const { loading, data, error, run } = useRequest(
    async (id) => {
      if (!id) throw new Error('没有问卷id')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true
    }
  )

  // 根据获取的data，设置redux
  useEffect(() => {
    if (!data) return
    const { componentList = [], title = '', desc = '', js = '', css = '' } = data
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 把 componentList 存储到 redux 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))

    // 把 pageInfo 存储到 redux 中
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])

  // 根据id变化，执行请求
  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error
  }
}
