import React, { useEffect, useState } from 'react';
import { useTitle, useRequest } from 'ahooks';
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'
import { Spin, Typography } from "antd"
import ListSearch from '../../components/ListSearch';
import { getQuestionListService } from '../../services/question';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';


const { Title } = Typography;


export default function List() {
  useTitle('小幕问卷 - 我的问卷')

  const { data = {}, loading } = useLoadQuestionListData({})
  const { list = [], total = 0 } = data;

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
        {!loading && list.length > 0 && list.map((q:any) => {
          return <QuestionCard key={q._id} {...q} />
        })}
      </div>
      <div className={styles.footer}>记载更多</div>
    </>
  )
}
