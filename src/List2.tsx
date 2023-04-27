import React, { FC, useState } from 'react'
import QuestionCard, { PropsTypes as ListItemType } from './components/QuestionCard'
import produce from 'immer'

const List2: FC = () => {
  // 问卷列表数据
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true }
  ])
  // const [count, setCount] = useState(0)

  // useEffect(() => {
  //   console.log('加载 ajax 网络请求')

  //   return () => {
  //     console.log('销毁')
  //   }
  // }, []) // 无依赖，组件初次渲染时执行

  // useEffect(() => {
  //   console.log('question list changed')
  // }, [questionList])

  // useEffect(() => {
  //   console.log('count changed')
  // }, [count, questionList])

  const add = () => {
    // setCount(count + 1)
    const r = Math.random().toString().slice(-3)
    // setQuestionList([
    //   ...questionList,
    //   {
    //     id: r,
    //     title: '问卷' + r,
    //     isPublished: false
    //   }
    // ])

    // immer方式：操作原数组
    setQuestionList(
      produce((draft) => {
        draft.push({
          id: r,
          title: '问卷' + r,
          isPublished: false
        })
      })
    )
  }

  const deleteQuestion = (id: string) => {
    // console.log(id)
    // const list = questionList.filter((v: ListItemType) => v.id !== id)
    // setQuestionList(list)

    // immer方式：操作原数组
    setQuestionList(
      produce((draft) => {
        const index = draft.findIndex((v: ListItemType) => v.id === id)
        draft.splice(index, 1)
      })
    )
  }

  const publishQuestion = (id: string) => {
    // console.log(id)
    // const list = questionList.map((v: ListItemType) => {
    //   if (v.id === id) {
    //     return { ...v, isPublished: true }
    //   }
    //   return v
    // })
    // setQuestionList(list)

    // immer方式：操作原数组
    setQuestionList(
      produce((draft) => {
        const item = draft.find((v: ListItemType) => v.id === id)
        if (item) {
          item.isPublished = true
        }
      })
    )
  }

  console.log('===render==')
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

export default List2
