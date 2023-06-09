import React from 'react'
import { Button, Form, Input, Space, Typography, message } from "antd";
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.less'
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { registerService } from '../services/user';


const { Title } = Typography;

// 注册页面
export default function Register() {
  const nav  = useNavigate()
  const { run } = useRequest(async values => {
    const { username, password, nickname } = values;
    await registerService(username, password, nickname);
  },{
    manual: true,
    onSuccess() {
      message.success('注册成功')
      nav('/login')
    }
  });
  const onFinish = (values : any) => {
    run(values);
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined/></Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        > 
          <Form.Item 
            label="用户名"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'string', min: 5, max: 20, message: '长度需要5～20之间' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confrim"
            dependencies={['password']}
            rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请确认昵称' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType='submit'>
                注册
              </Button>
              <Link to="/login ">已有账户，请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
