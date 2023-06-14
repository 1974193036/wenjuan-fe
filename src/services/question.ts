import { request } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
}

// 获取单个问卷信息
export async function getQuestionService(id: string) {
  return request<{
    id: string
    title: string
    desc: string
    js: string
    css: string
    isDeleted: boolean
    isPublished: boolean
    [k: string]: any
  }>({
    url: `/api/question/${id}`,
    method: 'get'
  })
}

// 创建问卷
export async function createQuestionService() {
  return request<{
    id: string
  }>({
    url: '/api/question',
    method: 'post'
  })
}

// 获取（查询）问卷列表
export async function getQuestionListService(opt: Partial<SearchOption> = {}) {
  return request<{
    list: {
      _id: string
      title: string
      isPublished: boolean
      isStar: boolean
      answerCount: number
      createdAt: string
      isDeleted: boolean
    }[]
    total: number
  }>({
    url: '/api/question',
    method: 'get',
    params: opt
  })
}
