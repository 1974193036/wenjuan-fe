import { StateType } from '@/store'
import { useSelector } from 'react-redux'

export function useGetComponentInfo() {
  const comp = useSelector<StateType>((state) => state.components) as StateType['components']

  const { componentList = [], selectedId, copiedComponent } = comp

  const selectedComponent = componentList.find((item) => item.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent
  }
}
