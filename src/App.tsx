import React from 'react'
// import List1 from './List1'
import List2 from './List2'
// import StateDemo1 from './StateDemo1'
// import StateDemo2 from './StateDemo2'
// import UseRefDemo from './UseRefDemo'
// import UseMemoDemo from './UseMemoDemo'
// import UseCallbackDemo from './UseCallbackDemo'
// import ClosureTrap from './ClosureTrap'
// import useTitle from './hooks/useTitle'
// import useMouse from './hooks/useMouse'
// import useGetInfo from './hooks/useGetInfo'

function App() {
  // useTitle('哈哈哈')

  // const { x, y } = useMouse()

  // const { loading, info } = useGetInfo()

  return (
    <>
      <h1>App Page</h1>
      {/* <h1>{loading ? '加载中' : info}</h1> */}
      {/* <h1>{x} - {y}</h1> */}
      <List2 />
      {/* <StateDemo1 /> */}
      {/* <StateDemo2 /> */}
      {/* <UseRefDemo /> */}
      {/* <UseMemoDemo /> */}
      {/* <UseCallbackDemo /> */}
      {/* <ClosureTrap /> */}
    </>
  )
}

export default App
