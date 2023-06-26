import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: ''
}

const pageInfolice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { resetPageInfo } = pageInfolice.actions

export default pageInfolice.reducer
