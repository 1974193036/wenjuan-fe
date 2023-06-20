import Component from './Component'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component,
  defaultProps: QuestionInputDefaultProps
}
