import React from 'react'
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from './Logo.module.less'
import { Link } from 'react-router-dom';


const { Title } = Typography;


export default function Logo() {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>
            滴滴问卷
          </Title>
        </Space>
      </Link>
    </div>
  )
}