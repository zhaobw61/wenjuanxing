import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";

export type ComponentInfoType = {
  fe_id: string 
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: []
}

export const componentsSlice = createSlice({
  name:'components',
  initialState: INIT_STATE,
  reducers: {
    // 重制所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload 
    },

    // 修改 selectedId
    changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
      return {...state, selectedId: action.payload }
    },

    // 添加新的组件
    addComponent:(draft: ComponentStateType, action:PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = draft;
      let newComponentList: ComponentInfoType[] = [...draft.componentList]
      const index = componentList.findIndex(c => c.fe_id === selectedId)
      
      if(index === -1) {
        newComponentList.push(newComponent)
      } else {
        newComponentList.splice(index + 1, 0, newComponent)
      }

      return {selectedId: newComponent.fe_id, componentList: newComponentList}
    }
  }
});

// console.log('componentsSlice.actions', componentsSlice.actions.resetComponents)
// console.log('componentsSlice.reducer', componentsSlice.reducer)

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions;

export default componentsSlice.reducer;