export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  // 用于 PropComponent 属性表单组件
  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入...'
}
