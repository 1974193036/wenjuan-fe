import { useNavPage } from '@/hooks/useNavPage'
import { useLoadUserInfo } from '@/hooks/useUserInfo'
import { Spin } from 'antd'
import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  const { waitingUserInfo } = useLoadUserInfo()
  useNavPage(waitingUserInfo)

  return (
    <>
      <h1>QuestionLayout</h1>
      <div>
        <Suspense fallback={<h1>正在加载中...</h1>}>
          {waitingUserInfo ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin></Spin>
            </div>
          ) : (
            <Outlet />
          )}
        </Suspense>
      </div>
    </>
  )
}

export default QuestionLayout
