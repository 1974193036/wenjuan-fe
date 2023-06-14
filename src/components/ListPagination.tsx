import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '@/constant'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props) => {
  const [usp] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()

  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  useEffect(() => {
    const page = parseInt(usp.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(usp.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [usp])

  const handleChangePage = (page: number, pageSize: number) => {
    usp.set(LIST_PAGE_PARAM_KEY, page.toString())
    usp.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: usp.toString()
    })
  }

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handleChangePage} />
  )
}

export default ListPagination
