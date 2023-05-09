import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'

export default function ManageLayout() {
  return (
    <div>
      <div>left</div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
