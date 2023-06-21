import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Input组件的配置
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component,
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps
}
