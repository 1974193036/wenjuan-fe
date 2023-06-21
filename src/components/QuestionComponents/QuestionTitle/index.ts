import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Title组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropComponent, // 修改属性
  defaultProps: QuestionTitleDefaultProps
}
