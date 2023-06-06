import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";

export type ComponentInfoType = {
  fe_id: string 
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentStateType = {
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentStateType = {
  componentList: []
}

export const componentsSlice = createSlice({
  name:'components',
  initialState: INIT_STATE,
  reducers: {
    // 重制所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload 
    }
  }
});

// console.log('componentsSlice.actions', componentsSlice.actions.resetComponents)
// console.log('componentsSlice.reducer', componentsSlice.reducer)

export const { resetComponents } = componentsSlice.actions;

export default componentsSlice.reducer;