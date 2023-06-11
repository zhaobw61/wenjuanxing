import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux';
import { copySelectedComponent, pasteCopiedComponent, removeSelectedComponent, selectNextComponent, selectPrevComponent } from '../store/componentsReducer';

function isActiveElemenyValid() {
  const activeElem = document.activeElement
  if(activeElem  === document.body) return true;

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if(!isActiveElemenyValid()) return
    dispatch(removeSelectedComponent())
  })
  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if(!isActiveElemenyValid()) return
    dispatch(copySelectedComponent())
  })
  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if(!isActiveElemenyValid()) return
    dispatch(pasteCopiedComponent())
  })
  // 向上移动
  useKeyPress(['uparrow'], () => {
    if(!isActiveElemenyValid()) return
    dispatch(selectPrevComponent())
  })
  // 向下移动
  useKeyPress(['downarrow'], () => {
    if(!isActiveElemenyValid()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress;