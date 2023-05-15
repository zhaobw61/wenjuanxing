import { Button, Space, Divider, Tag } from 'antd'
import { useNavigate, Link } from "react-router-dom";
import React, { FC } from 'react'
import styles from './QuestionCard.module.less'
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';


type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt:string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  console.log('asd');
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={ isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{color: 'red'}}/>}
              {title}
            </Space>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <Space>
          {isPublished ? <Tag color="processing">已发布</Tag>:<Tag>没有发布</Tag>}
          <span>答卷: { answerCount }</span>
          <span>{ createdAt }</span>
        </Space>
      </div>
      <Divider style={{margin: '12px 0'}} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button icon={<EditOutlined />} type="text" size="small" onClick={() => {
              nav(`/question/edit/${_id}`)
            }}>编辑问卷</Button>
          </Space>
          <Space>
            <Button
              icon={<LineChartOutlined />}
              type="text" size="small"
              onClick={() => {
                nav(`/question/stat/${_id}`)
              }}
              disabled = {!isPublished}
            >问卷统计</Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} type="text" size="small">
              { isStar ? '取消标星' : '标星' }
            </Button>
          </Space>
          <Space>
            <Button icon={<CopyOutlined />} type="text" size="small">复制</Button>
          </Space>
          <Space>
            <Button icon={<DeleteOutlined />} type="text" size="small">删除</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;