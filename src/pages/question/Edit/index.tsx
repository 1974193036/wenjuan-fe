import { useTitle } from 'ahooks'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  useTitle('问卷编辑')

  const { id = '' } = useParams()

  return <div>Edit -- {id}</div>
}

export default Edit
