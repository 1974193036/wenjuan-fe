import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '@/components/QuestionComponents'

// 后台返回的componentList的每一项的数据结构
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  props: ComponentPropsType
}

// 定义redux数据的初始值类型
export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

// 定义redux初始值
const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: []
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
    // 添加新组件
    addComponent(state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) {
      const newComponent = action.payload

      const { selectedId, componentList } = state
      const index = componentList.findIndex((item) => item.fe_id === selectedId)

      const list = [...componentList]
      if (index < 0) {
        // 未选中任何组件
        list.push(newComponent)
      } else {
        // 选中了组件，插入到 index 后面
        list.splice(index + 1, 0, newComponent)
      }
      return { ...state, componentList: list, selectedId: newComponent.fe_id }
    },
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
    }
  }
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } =
  componentSlice.actions

export default componentSlice.reducer
