import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTitle, useRequest, useDebounceFn } from 'ahooks';
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.less'
import { Empty, Spin, Typography } from "antd"
import ListSearch from '../../components/ListSearch';
import { getQuestionListService } from '../../services/question';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useSearchParams } from 'react-router-dom';
import { start } from 'repl';


const { Title } = Typography;


export default function List() {
  useTitle('小幕问卷 - 我的问卷')

  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || ''

  // keyword 变化的时候，重制信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  // 请求数据
  const { run: load, loading } = useRequest(async () =>{
    const data = await getQuestionListService({
      page:1,
      pageSize:10,
      keyword: searchParams.get('keyword')|| ''
    })
    return data
  },{
    manual: true,
    onSuccess(result) {
      const { list:l = [], total = 0 } = result;
      setList(list.concat(l)) // 累计
      setTotal(total)
      setPage(page + 1)
    }
  })

  // 触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if(elem == null) return
      const domRect = elem.getBoundingClientRect();
      if(domRect == null) return
      const { bottom } = domRect;
      if(bottom <= document.body.clientHeight) {
        load(); // 真的加载数据
        setStarted(true);
      }
    },
    {
      wait: 1000
    }
  )

  useEffect(() => {
    tryLoadMore();
  }, [searchParams])

  useEffect(() => {
    if(haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const loadMoreContentElem = useMemo(() => {
    if(!started || !loading)  return <Spin />

    if(total === 0) return <Empty description="暂无数据" />
    if(!haveMoreData) return <span>没有更多了 ...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData]) 

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
        {list.length > 0 && list.map((q:any) => {
          return <QuestionCard key={q._id} {...q} />
        })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem}</div>
      </div>
    </>
  )
}
