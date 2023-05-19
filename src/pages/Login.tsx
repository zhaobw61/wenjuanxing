import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.less'
import { Link } from "react-router-dom";
import { useEffect } from "react";

const { Title } = Typography;

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function remenberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username : localStorage.getItem(USERNAME_KEY),
    password : localStorage.getItem(PASSWORD_KEY)
  }
}


export default function Login() {
  const [ form ] = Form.useForm(); // 第三方的 hook
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])
  
  const onFinish = (values : any) => {
    const { username, password, remember } = values;
    if(remember) {
      remenberUser(username, password);
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined/></Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{remember:true }}
          onFinish={onFinish}
        > 
          <Form.Item 
            label="用户名"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox >记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType='submit'>
                登录
              </Button>
              <Link to="/register">注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
