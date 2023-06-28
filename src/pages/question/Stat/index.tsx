// import { getQuestionService } from '@/services/question'
import { useTitle } from 'ahooks'
import React, { FC } from 'react'
// import { useParams } from 'react-router-dom'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData()

  const { title } = useGetPageInfo()
  useTitle(`问卷统计 - ${title}`)

  return (
    <div>
      问卷统计
      {/* <p>Stat -- {id}</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
    </div>
  )
}

export default Edit
