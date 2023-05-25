import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button, Space, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import styles from './index.module.less'
import { useState } from 'react'

export default function ManageLayout() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  async function handleCreateCLick() {
    setLoading(true)
    const data = await createQuestionService();
    const { id } = data || {};
    if(id) {
      nav(`/question/edit/${id}`)
      message.success('创建问卷成功');
    }
    setLoading(false)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type='primary'
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateCLick}
            loading ={loading}
            >
              新建问卷
            </Button>
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list')
            }}
          >我的问卷</Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star')
            }}
          >星标问卷</Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large" icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/trash')
            }}
          >回收站</Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
