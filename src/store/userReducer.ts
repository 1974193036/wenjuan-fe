import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = {
  username: '',
  nickname: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    // 设置 username nickname
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return { ...state, ...action.payload }
    },
    logoutReducer: () => {
      return INIT_STATE
    }
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
