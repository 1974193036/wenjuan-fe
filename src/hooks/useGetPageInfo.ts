import { StateType } from '@/store'
import { useSelector } from 'react-redux'

export function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo) as StateType['pageInfo']
  return pageInfo
}
