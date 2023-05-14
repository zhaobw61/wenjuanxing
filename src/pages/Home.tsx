import { Button, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import styles from './Home.module.less';
const { Title, Paragraph } = Typography



export default function Home() {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷数量 100， 发布问卷 90 份， 收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => {
            nav('/manage/list')
          }}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}
