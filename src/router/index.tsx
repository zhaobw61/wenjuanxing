import { createBrowserRouter, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import List from '../pages/manage/List'
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import QuestionLayout from "../layouts/QuestionLayout";
import Edit from "../pages/question/Edit/index";
import Stat from "../pages/question/Stat/index";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      { 
        path: 'login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: 'manage',
        element:  <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />
          },
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout/>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  }
])
export default router;
//  ------- 常用的变量 -------
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGR_INDEX_PATHNAME = '/manage/list'

// 判断是不是登录页或者注册页
export function isLoginOrRegister(pathname: string) {
  if([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false;
}
// 不需要用户信息的页面
export function isNoNeedUserInfo(pathname: string) {
  if([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
  return false
}