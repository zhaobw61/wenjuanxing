import { Result, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function NotFound() {
  const nav = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉～～"
      extra={<Button type="primary" onClick={() => {
        nav('/')
      }}>返回首页</Button>}
    ></Result>
  )
}
