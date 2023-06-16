import { request } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export function getQuestionService(id: string) {
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
export function createQuestionService() {
  return request<{
    id: string
  }>({
    url: '/api/question',
    method: 'post'
  })
}

// 获取（查询）问卷列表
export function getQuestionListService(opt: Partial<SearchOption> = {}) {
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

// 更新单个问卷
export function updateQuestionService(id: string, opt: { [key: string]: any }) {
  return request({
    url: `/api/question/${id}`,
    method: 'patch',
    params: opt
  })
}

// 复制问卷
export function duplicateQuestionService(id: string) {
  return request<{ id: string }>({
    url: `/api/question/duplicate/${id}`,
    method: 'post'
  })
}

// 批量彻底删除
export function deleteQuestionsService(ids: string[]) {
  return request({
    url: '/api/question',
    method: 'delete',
    data: ids
  })
}
