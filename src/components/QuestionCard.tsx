import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { duplicateQuestionService, updateQuestionService } from '@/services/question'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = props

  const nav = useNavigate()

  // 修改 标星
  const [isStarState, setIsStarState] = useState(isStar)

  // 复制
  // Popconfirm组件：async函数可以基于promise的异步关闭效果，所以未使用useRequest
  const duplicate = async () => {
    try {
      const res = await duplicateQuestionService(_id)
      message.success('已复制')
      nav(`/question/edit/${res.id}`)
    } catch (e) {
      /* empty */
    }
  }

  // 标星/取消标星
  // 这里使用了useRequest，主要便捷的处理了下loading状态
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStarState })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      }
    }
  )

  const del = () => {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion
    })
  }

  // 删除
  // Modal.confirm组件：async函数可以基于promise的异步关闭效果，所以未使用useRequest
  const [isDeletedState, setIsDeletedState] = useState(false)
  const deleteQuestion = async () => {
    try {
      await updateQuestionService(_id, { isDeleted: true })
      message.success('已删除')
      setIsDeletedState(true)
    } catch (e) {
      /* empty */
    }
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              disabled={changeStarLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small">
                复制
              </Button>
            </Popconfirm>
            <Button type="text" icon={<DeleteOutlined />} size="small" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
