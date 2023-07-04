import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents'
import React, { FC, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentsReducer'

const { Title } = Typography

function genComponent(c: ComponentConfType, i: number) {
  const { Component, type, title, defaultProps } = c

  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(5),
        title,
        type,
        props: defaultProps
      })
    )
  }, [])

  return (
    <div className={styles.wrapper} key={i} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((item, index) => {
        const { groupId, groupName, components } = item
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : 0 }}>
              {groupName}
            </Title>
            <div>{components.map((c, i) => genComponent(c, i))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
