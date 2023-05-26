import { useTitle } from 'ahooks';
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'
import { Empty, Pagination, Spin, Typography } from "antd"
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';

const { Title } = Typography;

export default function Star() {
  useTitle('小幕问卷 - 星标问卷')
  const { data = {}, loading } = useLoadQuestionListData({isStar: true})
  const { list = [], total = 0 } = data;
  console.log('once')
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
      <div className={styles.footer}>
        <ListPage current={1} total={total}/>
      </div>
    </>
  )
} 
