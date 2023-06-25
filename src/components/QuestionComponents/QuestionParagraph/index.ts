import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Title组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropComponent, // 修改属性
  defaultProps: QuestionParagraphDefaultProps
}
