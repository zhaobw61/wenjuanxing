import React, { FC} from 'react'
import { Typography } from 'antd';
import { ComponentConfType, componentConfGroup } from '../../../components/QuestionComponents';
import styles from "./ComponentLib.module.less";
import { useDispatch } from 'react-redux';
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit';

const { Title } = Typography;

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(addComponent({
      fe_id: nanoid(),
      title,
      type,
      props: defaultProps
    }))
  }
  return <div key={type} className={styles.wrapper} onClick={handleClick}>
    <div className={styles.component}>
      <Component />
    </div>
  </div>
}


const ComponentLib: FC = () => {
  return <>
    {componentConfGroup.map((group, index) => {
      const { groupId, groupName, components } = group;
      return <div key={groupId}>
        <Title level={3} style={{fontSize: '16px', marginTop: index>0 ? '20px': '0'}}>{groupName}</Title>
        <div>{components.map(c => genComponent(c) )}</div>
      </div>
    })}
  </>
}

export default ComponentLib;