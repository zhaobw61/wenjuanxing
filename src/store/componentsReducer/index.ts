import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { getNextSelectedId } from './utils';
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";

export type ComponentInfoType = {
  fe_id: string 
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent?: ComponentInfoType | null
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null
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

      // return {selectedId: newComponent.fe_id, componentList: newComponentList}
    },

    // 修改组件
    changeComponentProps: (draft: ComponentStateType, action:PayloadAction<{fe_id: string, newProps: ComponentPropsType}>) => {
      const { fe_id, newProps } = action.payload;

      // 当前要修改的组件
      const curComp = draft.componentList.find(c => c.fe_id === fe_id)
      if(curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps
        }
      }
    },
    // 删除组件
    removeSelectedComponent: (draft: ComponentStateType) => {
      const { componentList = [], selectedId: removedId } = draft;
      let newComponentList: ComponentInfoType[] = [...componentList]
      const index = newComponentList.findIndex(c => c.fe_id === removedId)
      newComponentList.splice(index, 1);
      const newSelectedId = getNextSelectedId(removedId, componentList)
      return { selectedId: newSelectedId, componentList: [...newComponentList] }
    },
    
    // 隐藏/显示组件
    changeComponentHidden: (draft: ComponentStateType, action:PayloadAction<{ fe_id: string, isHidden: boolean }>) => {
      const { componentList = [] } = draft;
      const { fe_id, isHidden} = action.payload

      let newSelectedId = '';
      if(isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList)
      } else {
        newSelectedId = fe_id
      }
      draft.selectedId = newSelectedId;

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if(curComp) {
        curComp.isHidden = isHidden;
      }
    },

    // 锁定组件
    toggleComponentLocked: (draft: ComponentStateType, action:PayloadAction<{ fe_id: string }>) => {
      const {fe_id} = action.payload

      const curComp = draft.componentList.find(c => c.fe_id === fe_id)
      if(curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },

    // 拷贝当前的选中的组件
    copySelectedComponent:(draft: ComponentStateType) => {
      const {selectedId, componentList = []} = draft
      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if(selectedComponent == null) return
      draft.copiedComponent = cloneDeep(selectedComponent)
    },

    // 粘贴
    pasteCopiedComponent: (draft: ComponentStateType) => {
      const { copiedComponent } = draft
      if(copiedComponent == null) return
      
      copiedComponent.fe_id = nanoid()

      draft.componentList.push(copiedComponent)
    }
  }
});

export const { 
  resetComponents, 
  changeSelectedId, 
  addComponent, 
  changeComponentProps, 
  removeSelectedComponent, 
  changeComponentHidden, 
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent
} = componentsSlice.actions;

export default componentsSlice.reducer;