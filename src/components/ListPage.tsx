import { Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
  current: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize]  = useState(10)

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page =  parseInt(searchParams.get('page') || '') || 1;
    setCurrent(page)
    const pageSize =  parseInt(searchParams.get('pageSize') || '') || 10;
    setPageSize(pageSize)
  },[searchParams])

  // 当pagesize 改变的时候， 就跳转页面
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set('page', page.toString())
    searchParams.set('pageSize', pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString()
    })
  }
  
  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}/>
  )
}

export default ListPage
