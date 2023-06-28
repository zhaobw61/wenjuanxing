import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.less'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'
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

// 保存按钮
const SaveButton: FC = () => {
  const { id } = useParams() 
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(async () => {
    if(!id) return
    await updateQuestionService(id, {...pageInfo, componentList})
  }, { manual: true })

  // 自动保存
  useDebounceEffect(() => {
    save()
  }, [componentList, pageInfo], {
    wait: 1000
  })

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if(!loading) save()
  })
  return <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined/> : null}>保存</Button>
}

// 发布按钮
const PublishButton: FC = ()  => {
  const nav = useNavigate();
  const { id } = useParams() 
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(async () => {
    if(!id) return
    await updateQuestionService(id, {
      ...pageInfo,
      componentList,
      isPublished: true // 标志着问卷已经发布
    })
  }, { 
    manual: true,
    onSuccess: () => {
      message.success('发布成功')
      nav('/question/stat/'+ id) // 跳转到统计页
    }
  })

  return <Button onClick={pub} disabled={loading} icon={loading ? <LoadingOutlined/> : null}>发布</Button>
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
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  </div>
}

export default EditHeader;

