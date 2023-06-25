import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  const textList = text.split('\n')

  return (
    <Paragraph
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '0'
      }}
    >
      {textList.map((item, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
