import { Input } from 'antd'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  const [ searchParams ] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    console.log('searchParams', curVal)
    setValue(curVal)
  }, [searchParams])
  const handleSearch = () => {
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }
  return (
    <div>
      <Search
        size='large'
        allowClear
        placeholder='请输入关键字'
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: '220px' }}
      />
    </div>
  )
}

export default ListSearch
