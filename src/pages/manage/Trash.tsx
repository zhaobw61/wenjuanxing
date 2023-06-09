import { useTitle, useRequest } from 'ahooks';
import { Empty, Typography, Table, Tag, Button, Space, Modal, Spin, message } from "antd"
import React, { useState } from 'react'
import styles from './common.module.less'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { deleteQuestionService, updateQuestionService } from '../../services/question';

const { Title } = Typography;
const { confirm } = Modal;

export default function Trash() {
  useTitle('小幕问卷 - 删除问卷')

  const { data = {}, loading, refresh } = useLoadQuestionListData({isStar: true})
  const { list = [], total = 0 } = data;

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

  // 恢复
  const { run: recover } = useRequest(async () => {
    for await (const id of selectedIds) {
      await updateQuestionService(id, { isDeleted: false })
    }
  }, {
    manual: true,
    debounceMaxWait: 500,
    onSuccess() {
      message.success('恢复成功')
      refresh(); // 手动刷新列表
    }
  })

  const {run: deleteQuestion} = useRequest(async () => {
    const data = deleteQuestionService(selectedIds)
    return data;
  },{
    manual: true,
    onSuccess() {
      message.success('删除成功');
      refresh();
      setSelectedIds([])
    }
  })
  
  function del() {
    confirm({
      title: '确认彻底删除',
      icon: <ExclamationCircleOutlined/>,
      content: '删除了就彻底没了，学不动了',
      onOk: deleteQuestion
    });
  }
  return (
    <>
      <div className={styles.header}>
          <div className={styles.left}>
            <Title level={2}>我的问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch></ListSearch>
          </div>
      </div>
      <div className={styles.content}>
        { loading && <div style={{textAlign:'center'}}>
          <Spin/>
          </div> }
        {!loading && list.length === 0 && <Empty/>}
        {!loading && list.length > 0 && (
          <>
            <div style={{ marginBottom: '16px'}}>
              <Space>
                <Button type="primary" disabled={selectedIds.length === 0} onClick={() => {
                  recover()
                }}>恢复</Button>
                <Button disabled={selectedIds.length === 0} danger onClick={del}>彻底删除</Button>
              </Space>
            </div>
            <Table
              dataSource={list}
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
      <div className={styles.footer}>
        <ListPage current={1} total={total}/>
      </div>
    </>
  )
}
