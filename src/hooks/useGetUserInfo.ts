import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

function useGetUserInfo () {
  const { userName, nickName } = useSelector<StateType>(state => state.user) as UserStateType
  return { userName, nickName } 
}

export default useGetUserInfo
