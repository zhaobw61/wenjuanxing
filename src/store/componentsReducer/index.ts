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
    }
  }
});

// console.log('componentsSlice.actions', componentsSlice.actions.resetComponents)
// console.log('componentsSlice.reducer', componentsSlice.reducer)

export const { resetComponents, changeSelectedId } = componentsSlice.actions;

export default componentsSlice.reducer;