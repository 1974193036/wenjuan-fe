export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  // 用于 PropComponent 表单组件
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述'
}
