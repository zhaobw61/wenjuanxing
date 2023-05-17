import { Input } from 'antd'
import React, { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  const handleSearch = () => {
    nav({
      pathname: pathname,
      search: `keyword=${value}`
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
