import { Empty, Typography, Table, Tag } from "antd"
import React, { useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'

const { Title } = Typography;

export default function Trash() {
  const [questionList, setQuestionList] = useState([
    { 
      _id: '123',
      title: 'boooo',
      isStar: false,
      isPublished: false,
      answerCount: 123,
      createdAt: '20230202'
    },{ 
      _id: '333',
      title: 'b333',
      isStar: true,
      isPublished: false,
      answerCount: 33123,
      createdAt: '20330202'
    }
  ])
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag>:<Tag>没有发布</Tag>
      }
    },
    {
      title: '答卷',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ]
  return (
    <>
      <div className={styles.header}>
          <div className={styles.left}>
            <Title level={2}>我的问卷</Title>
          </div>
          <div className={styles.right}>收索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty/>}
        {questionList.length > 0 && <Table dataSource={questionList} columns={tableColumns} pagination={false} /> }
      </div>
      <div className={styles.footer}>记载更多</div>
    </>
  )
}
