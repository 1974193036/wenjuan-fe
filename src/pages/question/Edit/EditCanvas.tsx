import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { ComponentInfoType, changeSelectedId, moveComponent } from '@/store/componentsReducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const compConf = getComponentConfByType(type)
  if (!compConf) return
  const { Component } = compConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = (props) => {
  if (props.loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // 绑定快捷键
  useBindCanvasKeyPress()

  const { componentList, selectedId, selectedComponent } = useGetComponentInfo()
  console.log(componentList, selectedId, selectedComponent)

  const dispatch = useDispatch()

  const handleClick = (e: MouseEvent, id: string) => {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map((item) => ({
    ...item,
    id: item.fe_id
  }))

  // 拖拽排序结束
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    // console.log(oldIndex, newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((item) => !item.isHidden)
          .map((item) => {
            const { fe_id, isLocked } = item

            const wrapperClassName = classNames({
              [styles['component-wrapper']]: true,
              [styles.selected]: selectedId === fe_id,
              [styles.locked]: isLocked
            })

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={(e) => handleClick(e, fe_id)}>
                  <div className={styles.component}>{getComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
        {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle text={'一行标题哈哈哈'} level={2} isCenter={true} />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput title={'你的姓名'} placeholder={'请输入你的姓名...'} />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput title={'你的电话'} placeholder={'请输入你的电话...'} />
        </div>
      </div> */}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
