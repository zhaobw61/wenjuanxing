import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => {
    console.log(' state ', state)
    return state.components;
  }) as ComponentStateType;
  const { componentList = [] } = components;
  return { componentList };
}

export default useGetComponentInfo