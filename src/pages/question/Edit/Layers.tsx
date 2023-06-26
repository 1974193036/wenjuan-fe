import React, { ChangeEvent, FC, useState } from 'react'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { Button, Input, Space, message } from 'antd'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked
} from '@/store/componentsReducer'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()

  const dispatch = useDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  const hanleTitleClick = (fe_id: string) => {
    const curComp = componentList.find((item) => item.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }

    if (fe_id !== selectedId) {
      // 当前组件未被选中，点击执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    // 当前组件已经被选中，点击执行修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  // 切换 显示/隐藏
  const changeHidden = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  const changeLocked = (fe_id: string) => {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  return (
    <>
      {componentList.map((item) => {
        const { fe_id, title, isHidden, isLocked } = item
        const titleClassName = classNames({
          [styles.title]: true,
          [styles.selected]: fe_id === selectedId
        })
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => hanleTitleClick(fe_id)}>
              {fe_id === changingTitleId ? (
                <Input
                  value={title}
                  onPressEnter={() => setChangingTitleId('')}
                  onBlur={() => setChangingTitleId('')}
                  onChange={changeTitle}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden)}
                />
                <Button
                  size="small"
                  shape="circle"
                  className={!isLocked ? styles.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
