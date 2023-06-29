import React, { FC, memo, useEffect, useState } from 'react'
import { getQuestionStatListService } from '@/services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { STAT_PAGE_SIZE } from '@/constant'
import { Pagination, Spin, Table, Typography } from 'antd'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { flushSync } from 'react-dom'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<{ _id: string; [key: string]: any }[]>([])

  useEffect(() => {
    // 特殊需求：当改变pageSize时，页码自动回到第一页
    setPage(1)
  }, [pageSize])

  const { loading } = useRequest(
    async () => {
      const data = await getQuestionStatListService(id, { page, pageSize })
      return data
    },
    {
      refreshDeps: [id, page, pageSize],
      debounceWait: 10, // 配合特殊需求，做一个防抖，有些场景下会重复调用
      onSuccess(data) {
        const { total = 0, list = [] } = data
        setTotal(total)
        setList(list)
      }
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map((item) => {
    const { fe_id, title, props = {}, type } = item
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const colTitle = props!.title || title
    return {
      // title: colTitle,
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id
    }
  })

  const dataSource = list.map((item) => ({ ...item, key: item._id }))

  const TableElem = (
    <>
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page) => {
            console.log('onChange', page)
            setPage(page)
          }}
          onShowSizeChange={(page, pageSize) => {
            console.log('onShowSizeChange', page, pageSize)
            setPageSize(pageSize)
          }}
        ></Pagination>
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量: {total}</Title>
      {TableElem}
    </div>
  )
}

export default PageStat
