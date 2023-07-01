import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Button, Result, Spin } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';

export default function Stat() {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { title } = useGetPageInfo();const isPublished = true;

  // 修改标题
  useTitle(`问卷统计页-${title}`)

  if(loading) {
    return (
      <div style={{textAlign: 'center', marginTop: '60px'}}>
        <Spin />
      </div>
    )
  }
  if(!isPublished) {
    return <div style={{flex: '1'}}>
      <Result
        status="warning"
        title="该页面没有发布 "
        subTitle="抱歉～～"
        extra={<Button type="primary" onClick={() => {
          nav('/')
        }}>返回首页</Button>}
      ></Result>
    </div>
  }
  return (
    <div>
      { loading ? <div>loading</div> : <div>Stat</div> }
    </div>
  )
}
