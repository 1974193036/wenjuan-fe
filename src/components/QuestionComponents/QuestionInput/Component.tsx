import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props) => {
  const { title = '', placeholder = '请输入...' } = { ...QuestionInputDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong style={{ marginBottom: '0.4em' }}>
        {title}
      </Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
