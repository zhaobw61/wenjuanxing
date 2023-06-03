import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'; 
import { useDispatch }  from 'react-redux'
import { Button } from 'antd';
import { removeToken } from '../utils/user-token';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { logoutReducer } from '../store/userReducer'

export default function UserInfo() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // const { data } = useRequest(async() => {
  //   const data = await getUserInfoService()
  //   return data;
  // })
  // const { username, nickname } = data || {};
  const { userName: username, nickName: nickname} = useGetUserInfo()
  console.log('---', JSON.stringify(logoutReducer()))
  function logout() {
    dispatch(logoutReducer())
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
