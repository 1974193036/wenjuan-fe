import { getQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

// 获取单个问卷信息
export function useLoadQuestionData() {
  const { id = '' } = useParams()

  // 改造成useRequest
  const { loading, data, error } = useRequest(async () => {
    const data = await getQuestionService(id)
    return data
  })

  // const [loading, setLoading] = useState(false)
  // const [questionData, setQuestionData] = useState({})
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       setLoading(true)
  //       const data = await getQuestionService(id)
  //       setQuestionData(data)
  //     } finally {
  //       setLoading(false)
  //     }
  //   })()
  // }, [])

  return {
    loading,
    data,
    error,
    id
  }
}
