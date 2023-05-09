import React, { FC } from 'react'
import { Outlet } from 'react-router-dom';
const MainLayout:FC = () => {
  return (
    <>
      <div>MainLayout</div>
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </>
  )
}
export default MainLayout;
