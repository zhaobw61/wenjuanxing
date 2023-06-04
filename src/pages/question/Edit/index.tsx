import React, { useEffect, useState } from 'react'
import { getQuestionService } from '../../../services/question'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.less'
import EditCanvas from './EditCanvas'

export default function Edit() {
  const {loading, data} = useLoadQuestionData();
  return (
    <div className={styles.container}>
      <div style={{height:'50px', backgroundColor:'#fff'}}>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas />
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}
