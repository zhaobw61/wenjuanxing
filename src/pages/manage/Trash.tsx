import { Empty, Typography, Table, Tag, Button, Space, Modal } from "antd"
import React, { useState } from 'react'
import styles from './common.module.less'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { Title } = Typography;
const { confirm } = Modal;

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
  const [selectedIds, setSelectedIds] = useState<string[]>([])
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
  function del() {
    confirm({
      title: '确认彻底删除',
      icon: <ExclamationCircleOutlined/>,
      content: '删除了就彻底没了',
      onOk: ()=>{
        console.log('del yes')
      }
    });
  }
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
        {questionList.length > 0 && (
          <>
            <div style={{ marginBottom: '16px'}}>
              <Space>
                <Button type="primary" disabled={selectedIds.length === 0} onClick={() => {
                  
                }}>恢复</Button>
                <Button disabled={selectedIds.length === 0} danger onClick={del}>彻底删除</Button>
              </Space>
            </div>
            <Table
              dataSource={questionList}
              columns={tableColumns}
              pagination={false}
              rowKey={(q) => {
                return q._id
              }}
              rowSelection={{
                type: 'checkbox',
                onChange:(selectedRowkeys) => {
                  console.log(selectedRowkeys)
                  setSelectedIds(selectedRowkeys as string[]);
                }
              }}
            />
          </>
        ) 
        }
      </div>
      <div className={styles.footer}>记载更多</div>
    </>
  )
}
