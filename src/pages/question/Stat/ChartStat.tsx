import { getComponentStatService } from '@/services/stat'
import { useRequest } from 'ahooks'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Typography } from 'antd'
import PieDemo from './PieDemo'
import BarDemo from './BarDemo'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const ChartStat: FC<PropsType> = (props) => {
  const { selectedComponentId, selectedComponentType } = props

  const { id = '' } = useParams()

  const [stat, setStat] = useState<{ [key: string]: any }[]>([])

  const { loading, run } = useRequest(
    async (quesitonId, componentId) => {
      const data = await getComponentStatService(quesitonId, componentId)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      }
    }
  )

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId)
    }
  }, [selectedComponentId])

  const genStatElem = () => {
    if (!selectedComponentId) return <div>未选中组件</div>

    return <BarDemo />

    // return <div>{JSON.stringify(stat)}</div>
  }

  return (
    <div>
      <Title level={3}>图表统计</Title>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && genStatElem()}
    </div>
  )
}

export default ChartStat
