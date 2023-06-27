import { useNavPage } from '@/hooks/useNavPage'
import { useLoadUserInfo } from '@/hooks/useUserInfo'
import { Spin } from 'antd'
import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin></Spin>
    </div>
  )
}

const QuestionLayout: FC = () => {
  const { waitingUserInfo } = useLoadUserInfo()
  useNavPage(waitingUserInfo)

  return (
    <div>
      <Suspense fallback={<Loading />}>{waitingUserInfo ? <Loading /> : <Outlet />}</Suspense>
    </div>
  )
}

export default QuestionLayout
