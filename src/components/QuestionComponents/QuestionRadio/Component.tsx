import React, { FC } from 'react'
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface'
import { Radio, Space, Typography } from 'antd'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props) => {
  const {
    title,
    isVertical = false,
    options = [],
    value = ''
  } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong style={{ marginBottom: '0.4em' }}>
        {title}
      </Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((item) => {
            const { text, value } = item
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
