import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { useNavigate, Link } from "react-router-dom";
import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.less'
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { updateQuestionService, duplicateQuestionService } from '../services/question';

const { confirm } = Modal;

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isDeleted: boolean
  isPublished: boolean
  answerCount: number
  createdAt:string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, createdAt, answerCount, isPublished, isStar, isDeleted  } = props;
  
  // 修改 标星
  const [isStartState, setIsStartState] = useState(isStar)
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)

  const { loading: changeStarLoading, run: changeStar } = useRequest(async () => {
    await updateQuestionService(_id, { isStar: !isStartState })
  }, {
    manual: true,
    onSuccess() {
      setIsStartState(!isStartState) // 更新state
      message.success('已设置')
    }
  })

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result:any) {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`)
      }
    }
  )

  // 删除
  const {loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true });
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeletedState(true)
      }
    }
  )

  // 不显示删除
  if(isDeletedState) return null

  
  function del() {
    confirm({
      title: '确认要删除？',
      icon: <ExclamationCircleOutlined/>,
      okText: '确认',
      cancelText: '取消',
      onOk: deleteQuestion
    })
  }
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
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => {
                nav(`/question/edit/${_id}`)
            }}>编辑问卷</Button>
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
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              { isStartState ? '取消标星' : '标星' }
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">复制</Button>
            </Popconfirm>
            <Button icon={<DeleteOutlined />} type="text" size="small" onClick={del} disabled={deleteLoading}>删除</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;