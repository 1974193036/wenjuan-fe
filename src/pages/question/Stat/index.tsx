// import { getQuestionService } from '@/services/question'
import { useTitle } from 'ahooks'
import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  useTitle('问卷统计')

  const { loading, error } = useLoadQuestionData()

  // const { id = '' } = useParams()

  // const [loading, setLoading] = useState(false)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       setLoading(true)
  //       const data = await getQuestionService(id)
  //       // console.log('edit page', data)
  //       setQuestionData(data)
  //     } finally {
  //       setLoading(false)
  //     }
  //   })()
  // }, [])

  return (
    <div>
      问卷统计
      {/* <p>Stat -- {id}</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
    </div>
  )
}

export default Edit
