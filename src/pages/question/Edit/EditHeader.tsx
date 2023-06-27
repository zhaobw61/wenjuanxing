import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Input } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.less'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography;

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const dispatch = useDispatch();

  const [editState, SetEditState] = useState(false);

  if(editState) {
    return ( 
      <Input value={title}
        onPressEnter={() =>{ SetEditState(false) }}
        onBlur={() => { SetEditState(false) }}
        onChange={(e) => {dispatch(changePageTitle(e.target.value))}}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined/>} type='text' onClick={() => {
        SetEditState(true)
      }}></Button>
    </Space> 
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate();
  return <div className={styles['header-wrapper']}>
    <div className={styles['header']}>
      <div className={styles['left']}>
        <Space>
          <Button type='link' icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
          <TitleElem />
        </Space>
      </div>
      <div className={styles['main']}>
        <EditToolbar />
      </div>
      <div className={styles['right']}>
        <Space>
          <Button>保存</Button>
          <Button type='primary'>发布</Button>
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader;

