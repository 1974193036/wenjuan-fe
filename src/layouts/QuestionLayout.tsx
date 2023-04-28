import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <h1>QuestionLayout</h1>
      <div>
        <Suspense fallback={<h1>正在加载中...</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default QuestionLayout
