import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from '@/store/componentsReducer'
import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'

function isActiveElementValid() {
  const activeElem = document.activeElement
  if (activeElem === document.body) return true // 光标没有focus到input
  return false
}

export function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 删除组件
  useKeyPress(
    ['backspace', 'delete'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(removeSelectedComponent())
    },
    {
      target: document.getElementById('main-canvas')
    }
  )

  // 复制
  useKeyPress(
    ['ctrl.c', 'meta.c'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(copySelectedComponent())
    },
    {
      target: document.getElementById('main-canvas')
    }
  )

  // 粘贴
  useKeyPress(
    ['ctrl.v', 'meta.v'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(pasteCopiedComponent())
    },
    {
      target: document.getElementById('main-canvas')
    }
  )

  // 选中上一个
  useKeyPress(
    'uparrow',
    () => {
      if (!isActiveElementValid()) return
      dispatch(selectPrevComponent())
    },
    {
      target: document.getElementById('main-canvas')
    }
  )

  // 选中下一个
  useKeyPress(
    'downarrow',
    () => {
      if (!isActiveElementValid()) return
      dispatch(selectNextComponent())
    },
    {
      target: document.getElementById('main-canvas')
    }
  )

  // TODO 撤销重做
}
