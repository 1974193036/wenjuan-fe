import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import type { ComponentPropsType } from '@/components/QuestionComponents'
import produce from 'immer'
import { getNextSelectedId, insertNewComponent } from './utils'
import { nanoid } from 'nanoid'

// 后台返回的componentList的每一项的数据结构
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  props: ComponentPropsType
  isHidden?: boolean
  isLocked?: boolean
}

// 定义redux数据的初始值类型
export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

// 定义redux初始值
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
}

const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    // 修改selectedId
    changeSelectedId(state: ComponentsStateType, action: PayloadAction<string>) {
      return { ...state, selectedId: action.payload }
    },
    // 添加新组件（无immer的写法）
    // addComponent(state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) {
    //   const newComponent = action.payload

    //   const { selectedId, componentList } = state
    //   const index = componentList.findIndex((item) => item.fe_id === selectedId)

    //   const list = [...componentList]
    //   if (index < 0) {
    //     // 未选中任何组件
    //     list.push(newComponent)
    //   } else {
    //     // 选中了组件，插入到 index 后面
    //     list.splice(index + 1, 0, newComponent)
    //   }
    //   return { ...state, componentList: list, selectedId: newComponent.fe_id }
    // },
    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),
    // 修改组件属性
    changeComponentProps(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload
      const { componentList } = state
      const list = componentList.map((item) => {
        if (item.fe_id === fe_id) {
          return { ...item, props: { ...item.props, ...newProps } }
        }
        return { ...item }
      })
      return { ...state, componentList: list }
    },
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = draft

      if (!removeId) return

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex((item) => item.fe_id === removeId)
      componentList.splice(index, 1)
    }),
    // 隐藏/显示组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        // 重新计算selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find((item) => item.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload
        const curComp = draft.componentList.find((item) => item.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const selectedComponent = componentList.find((item) => item.fe_id === selectedId)
      if (!selectedComponent) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (!copiedComponent) return

      // 要把fe_id修改了，非常重要
      copiedComponent.fe_id = nanoid(5)

      // 插入新组件
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const index = componentList.findIndex((item) => item.fe_id === selectedId)
      if (index < 0) return // 此时未选中组件
      if (index <= 0) return // 已经选中了第一个，无法向上选中

      draft.selectedId = componentList[index - 1].fe_id
    }),
    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId } = draft
      const index = componentList.findIndex((item) => item.fe_id === selectedId)
      if (index < 0) return // 此时未选中组件
      if (index + 1 === componentList.length) return // 已经选中了最后一个，无法继续向下选中

      draft.selectedId = componentList[index + 1].fe_id
    })
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent
} = componentSlice.actions

export default componentSlice.reducer
