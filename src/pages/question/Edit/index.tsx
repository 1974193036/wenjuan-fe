import { useTitle } from 'ahooks'
import React, { FC } from 'react'
import { useLoadQuestionData } from '@/hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import EditHeader from './EditHeader'

const Edit: FC = () => {
  useTitle('问卷编辑')

  const { loading } = useLoadQuestionData()

  const dispatch = useDispatch()

  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div id="main-canvas" className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <p>Edit -- {id}</p>
    //   {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    // </div>
  )
}

export default Edit
