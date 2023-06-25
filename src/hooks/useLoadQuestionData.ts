import { getQuestionService } from '@/services/question'
import { resetComponents } from '@/store/componentsReducer'
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
    const { componentList = [] } = data
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
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
