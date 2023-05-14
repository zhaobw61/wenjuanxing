import React, { FC } from 'react'
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './MainLayout.module.less'

const { Header, Content, Footer } = Layout;

const MainLayout:FC = () => {
  console.log('styles', styles)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>Logo</div>
        <div className={styles.right}>登录</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>cc 问卷 &copy; 2023 boowen </Footer>
    </Layout>
  )
}
export default MainLayout;
