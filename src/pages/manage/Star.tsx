import { useTitle } from 'ahooks';
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'
import { Empty, Spin, Typography } from "antd"
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

const { Title } = Typography;

export default function Star() {
  useTitle('小幕问卷 - 星标问卷')

  const { data = {}, loading } = useLoadQuestionListData({isStar: true})
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
          <div className={styles.left}>
            <Title level={2}>星标问卷</Title>
          </div>
          <div className={styles.right}>
            <ListSearch></ListSearch>
          </div>
      </div>
      <div className={styles.content}>
        { loading && <div style={{textAlign:'center'}}>
          <Spin/>
        </div> }
        {!loading &&list.length === 0 && <Empty/>}
        {list.length > 0 && list.map((item:any) => {
          return <QuestionCard {...item} key={item._id}/>
        })}
      </div>
      <div className={styles.footer}>加载更多</div>
    </>
  )
} 
