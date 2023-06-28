import React, { FC } from 'react'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props) => {
  return <div>PageStat - {props.selectedComponentId}</div>
}

export default PageStat
