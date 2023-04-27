import { useState, useEffect } from 'react'

// 异步获取信息
function getInfo(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Date.now().toString())
    }, 1500)
  })
}

const useGetInfo = () => {
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  useEffect(() => {
    setLoading(true)
    getInfo().then((res) => {
      setInfo(res)
      setLoading(false)
    })
  }, [])
  return {
    loading,
    info
  }
}

export default useGetInfo
