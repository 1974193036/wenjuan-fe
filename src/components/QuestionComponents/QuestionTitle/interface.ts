export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  // 用于 PropComponent 属性表单组件
  onChange?: (newProps: QuestionTitlePropsType) => void
  disabled?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false
}
