import React, { FC } from 'react'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props) => {
  return (
    <div>
      ChartStat - {props.selectedComponentId} - {props.selectedComponentType}
    </div>
  )
}

export default ChartStat
