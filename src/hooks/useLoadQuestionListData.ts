import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/services/question'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY
} from '@/constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

// 获取（查询）问卷列表
export function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const [usp] = useSearchParams()

  const { isStar, isDeleted } = opt

  const { loading, data } = useRequest(
    async () => {
      const keyword = usp.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(usp.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(usp.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [usp] // 刷新的依赖项
    }
  )

  return {
    loading,
    data
  }
}
