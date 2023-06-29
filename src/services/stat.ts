import { request } from './ajax'

// 获取问卷的统计列表
export function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
) {
  return request<{
    total: number
    list: { _id: string; [key: string]: any }[]
  }>({
    url: `/api/stat/${questionId}`,
    method: 'get',
    params: opt
  })
}

// 获取组件统计数据汇总
export function getComponentStatService(questionId: string, componentId: string) {
  return request<{
    stat: { [key: string]: any }[]
  }>({
    url: `/api/stat/${questionId}/${componentId}`,
    method: 'get'
  })
}
