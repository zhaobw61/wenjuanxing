import React, { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const RightPanel : FC = () => {
  const [activeKey, setActiveKey] = useState('prop');
  const { selectedId } = useGetComponentInfo()
  useEffect(() => {
    if(selectedId) setActiveKey('prop')
    else setActiveKey('setting')
  }, [selectedId])
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <div>
        <ComponentProp />
      </div>
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>
        <PageSetting />
      </div>
    }
  ]
  return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel

