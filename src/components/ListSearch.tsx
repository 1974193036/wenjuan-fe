import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant'

const { Search } = Input

const ListSearch = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [usp] = useSearchParams()

  const [value, setValue] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSearch = (value: string) => {
    // 页面跳转，增加url参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  // 获取url参数，并设置到输入框
  useEffect(() => {
    // console.log(usp.get(LIST_SEARCH_PARAM_KEY))
    const value = usp.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(value)
  }, [usp])

  return (
    <Search
      size="large"
      allowClear
      placeholder="输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    ></Search>
  )
}

export default ListSearch
