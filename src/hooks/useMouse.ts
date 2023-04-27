import { useEffect, useState } from 'react'

function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mouseMoveHandler = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler)
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return {
    x,
    y
  }
}

export default useMouse
