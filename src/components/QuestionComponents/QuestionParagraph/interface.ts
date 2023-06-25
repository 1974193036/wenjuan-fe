export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 用于 PropComponent 属性表单组件
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false
}
