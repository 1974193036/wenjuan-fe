import React, { FC, useEffect } from 'react'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { getComponentConfByType } from '@/components/QuestionComponents'
import classNames from 'classnames'
import styles from './ComponentList.module.scss'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const ComponentList: FC<PropsType> = (props) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { componentList } = useGetComponentInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter((item) => !item.isHidden)
        .map((item) => {
          const { fe_id, type, props } = item

          const componentConf = getComponentConfByType(type)
          if (!componentConf) return null

          const { Component } = componentConf

          const wrapperClassName = classNames({
            [styles['component-wrapper']]: true,
            [styles.selected]: selectedComponentId === fe_id
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
