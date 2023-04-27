import React, { FC, useState } from 'react'
import QuestionCard, { PropsTypes as ListItemType } from './components/QuestionCard'

const List1: FC = () => {
  // 问卷列表数据
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true }
  ])
  const add = () => {
    const r = Math.random().toString().slice(-3)
    setQuestionList([
      ...questionList,
      {
        id: r,
        title: '问卷' + r,
        isPublished: false
      }
    ])
  }

  const deleteQuestion = (id: string) => {
    // console.log(id)
    const list = questionList.filter((v: ListItemType) => v.id !== id)
    setQuestionList(list)
  }

  const publishQuestion = (id: string) => {
    // console.log(id)
    const list = questionList.map((v: ListItemType) => {
      if (v.id === id) {
        return { ...v, isPublished: true }
      }
      return v
    })
    setQuestionList(list)
  }

  return (
    <>
      <h1>问卷列表页1</h1>
      <div>
        {questionList.map((item) => {
          return (
            <QuestionCard
              key={item.id}
              id={item.id}
              title={item.title}
              isPublished={item.isPublished}
              deleteQuestion={deleteQuestion}
              publishQuestion={publishQuestion}
            ></QuestionCard>
          )
        })}
      </div>
      <div>
        <button onClick={add}>新增问卷</button>
      </div>
    </>
  )
}

export default List1
