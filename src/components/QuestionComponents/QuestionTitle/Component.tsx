import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const getFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    if (level === 4) return '14px'
    if (level === 5) return '12px'
    return '12px'
  }

  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'left',
          marginBottom: '0',
          fontSize: getFontSize(level)
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
