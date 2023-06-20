import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '@/components/QuestionComponents'

// 后台返回的componentList的每一项的数据结构
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  props: ComponentPropsType
}

// 后台返回的data的数据结构
export type ComponentsStateType = {
  // id: string
  // title: string
  // desc: string
  // js: string
  // css: string
  // isDeleted: boolean
  // isPublished: boolean
  selectedId: string
  componentList: Array<ComponentInfoType>
}

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
    }
  }
})

export const { resetComponents, changeSelectedId } = componentSlice.actions

export default componentSlice.reducer
