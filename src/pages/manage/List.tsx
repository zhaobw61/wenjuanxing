import React, { useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'


export default function List() {
  const [questionList, setQuestionList] = useState([
    { 
      _id: '123',
      title: 'boooo',
      isStar: false,
      isPublished: false,
      answerCount: 123,
      createdAt: '20230202'
    },{ 
      _id: '333',
      title: 'b333',
      isStar: false,
      isPublished: false,
      answerCount: 33123,
      createdAt: '20330202'
    }
  ])
  return (
    <>
      <div className={styles.header}>
          <div className={styles.left}>
            <h3>我的问卷</h3>
          </div>
          <div className={styles.right}>收索</div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 && questionList.map(item => {
          return <QuestionCard {...item} key={item._id}/>
        })}
      </div>
      <div className={styles.footer}>记载更多</div>
    </>
  )
}
