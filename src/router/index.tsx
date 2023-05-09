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
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

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