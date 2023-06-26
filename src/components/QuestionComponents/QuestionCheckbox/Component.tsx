import React, { FC } from 'react'
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface'
import { Checkbox, Space, Typography } from 'antd'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical = false, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong style={{ marginBottom: '0.4em' }}>
        {title}
      </Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((item) => {
          const { text, value, checked } = item
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckbox
