import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  user: UserStateType

  // components: ComponentsStateType

  // 加入undo
  components: StateWithHistory<ComponentsStateType>

  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,

    // components: componentsReducer,

    // 增加了undo
    components: undoable(componentsReducer, {
      limit: 20, // 限制只能撤销20步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ]) // 屏蔽某些 action
    }),

    pageInfo: pageInfoReducer
  }
})
