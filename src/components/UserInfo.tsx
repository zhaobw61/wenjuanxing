import { useRequest } from 'ahooks';
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; 
import { getUserInfoService } from '../services/user';
import { Button } from 'antd';
import { removeToken } from '../utils/user-token';

export default function UserInfo() {
  const nav = useNavigate();
  const { data } = useRequest(async() => {
    const data = await getUserInfoService()
    return data;
  })
  const { username, nickname } = data || {};
  function logout() {
    removeToken() // clear token
    nav('/login')
  }
  const UserInfo = (
    <>
      <span style={{color: '#e8e8e8'}}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>退出</Button>
    </>
  )
  const Login = (
    <Link to="/login">登录</Link>
  )
  return (
    <div>
      {username ?  UserInfo : Login}
    </div>
  )
}
