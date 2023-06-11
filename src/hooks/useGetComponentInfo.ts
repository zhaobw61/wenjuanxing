import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const components = useSelector<StateType>(state => {
    return state.components;
  }) as ComponentStateType;
  const { componentList = [], selectedId, copiedComponent } = components;
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)
  return { 
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}

export default useGetComponentInfo