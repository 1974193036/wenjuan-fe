import { StateType } from '@/store'
import { useSelector } from 'react-redux'

export function useGetComponentInfo() {
  const comp = useSelector<StateType>((state) => state.components) as StateType['components']

  const { componentList = [], selectedId } = comp

  return {
    componentList,
    selectedId
  }
}
