import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.less'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'

export default function Edit() {
  const {loading} = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <div style={{height:'50px', backgroundColor:'#fff'}}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']} onClick={clearSelectedId}>
              <EditCanvas loading={loading}/>
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}
