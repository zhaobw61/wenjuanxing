import { ComponentInfoType } from './index'

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[] ) {
  const index = componentList.findIndex(c => c.fe_id === fe_id)
  if(index<0) return ''
  //重新计算
  let newSelectedId = ''
  const length = componentList.length;
  if(length <= 1) {
    newSelectedId = ''
  } else {
    if(index + 1 === length) {
      newSelectedId = componentList[index - 1].fe_id;
    } else {
      newSelectedId = componentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}