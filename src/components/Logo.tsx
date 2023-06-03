import React, { useEffect, useState } from 'react'
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from './Logo.module.less'
import { Link } from 'react-router-dom';
import useGetUserInfo from '../hooks/useGetUserInfo';


const { Title } = Typography;

export default function Logo() {
  const { userName } = useGetUserInfo()

  const [ pathname, setPathname ] = useState('/')
  useEffect(() => {
    if(userName) {
      setPathname('/manage/list')
    }
  }, [userName])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>
            UPM
          </Title>
        </Space>
      </Link>
    </div>
  )
}
