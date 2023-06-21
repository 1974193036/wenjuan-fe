import React, { FC } from 'react'
import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '@/store/componentsReducer'

const NoProp = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()

  if (selectedComponent == undefined || selectedComponent == null) {
    return <NoProp />
  }

  const changeProps = (newProps: ComponentPropsType) => {
    // console.log(newProps)
    if (selectedComponent == undefined || selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  // 从组件列表中筛选出对应的组件项
  const { type, props } = selectedComponent
  const compConf = getComponentConfByType(type)
  if (compConf == undefined || compConf == null) return <NoProp />
  const { PropComponent } = compConf

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
