import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd';
import { useDispatch } from "react-redux";
import classNames from 'classnames';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import styles from "./EditCanvas.module.less";
import { getComponentConfByType } from '../../../components/QuestionComponents';
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer';


type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType){
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)
  if(componentConf == null ) return null

  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({loading}) => {
  const { componentList, selectedId } =  useGetComponentInfo();
  const dispatch = useDispatch();

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id))
  }

  if(loading) {
    return <div style={{textAlign:'center', marginTop: '24px'}}>
      <Spin />
    </div>
  }
  return (
    <div className={styles.canvas}>
      {
        componentList.filter(c => !c.isHidden).map(c => {
          const { fe_id, isLocked } = c;
          
          // 拼接className
          const wrapperDefaultClassname = styles['component-wrapper']
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassname]: true,
            [selectedClassName]: selectedId === fe_id,
            [lockedClassName] : isLocked
          })
          return (
            <div key={fe_id} className={wrapperClassName} onClick={(event) => {
              handleClick(event, fe_id)
            }}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })
      }
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}
export default EditCanvas;