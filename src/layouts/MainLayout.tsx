import React, { FC } from 'react'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './ManageLayout.module.less'

const { Header, Content, Footer } = Layout;

const MainLayout:FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>Logo</div>
        <div className={styles.right}>登录</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>Footer</Footer>
    </Layout>
  )
}
export default MainLayout;
