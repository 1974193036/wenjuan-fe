import React, { FC } from 'react'
// import './QuestionCard.css'
// import classnames from 'classnames'
// import styles from './QuestionCard.module.scss'
// import { ListItem } from './QuestionCard'
import styled, { css } from 'styled-components'

export type PropsTypes = {
  id: string
  title: string
  isPublished: boolean
  deleteQuestion?: (id: string) => void
  publishQuestion?: (id: string) => void
}

const QuestionCard: FC<PropsTypes> = (props) => {
  const { id, title, isPublished, publishQuestion, deleteQuestion } = props

  // useEffect(() => {
  //   console.log('question card mounted')

  //   return () => {
  //     console.log('question card unmounted', id) // 销毁
  //   }

  //   // 生命周期：创建，更新（state 变化），销毁
  // }, [])

  // const itemClassName = classnames('list-item', { published: isPublished })
  // const itemClassName = classnames({
  //   'list-item': true,
  //   published: isPublished
  // })
  // console.log(itemClassName) // list-item published

  // const itemClassName = classnames({
  //   [styles['list-item']]: true,
  //   [styles.published]: isPublished
  // })
  // console.log(itemClassName) // QuestionCard_list-item__VXugx QuestionCard_published__VshS5

  const handlePublish = (id: string) => {
    // console.log(id)
    publishQuestion && publishQuestion(id)
  }

  const handleDelete = (id: string) => {
    // console.log(id)
    deleteQuestion && deleteQuestion(id)
  }

  return (
    // <div className={['list-item', isPublished ? 'published' : null].join(' ')}>
    <ListItem isPublished={isPublished}>
      <strong className="title">{title}</strong>
      {isPublished ? <span className="published-span">已发布</span> : <span>未发布</span>}
      <button onClick={() => handlePublish(id)}>发布问卷</button>
      <button onClick={() => handleDelete(id)}>删除问卷</button>
    </ListItem>
  )
}

export default QuestionCard

const ListItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 16px;

  // border-color: ${(props: { isPublished: boolean }) => (props.isPublished ? 'green' : '#ccc')};
  ${(props: { isPublished?: boolean }) =>
    props.isPublished &&
    css`
      border: 1px solid green;
    `}

  // 嵌套 scss
  .published-span {
    color: green;
  }

  // 嵌套 scss
  .title {
    font-size: 20px;
  }
`
