import React, { FC, useEffect, useState } from 'react'
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import TextArea from 'antd/es/input/TextArea';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const PageSetting:FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  const dispacth = useDispatch();

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispacth(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{required: true, message: '请输入标题'}]}>
        <Input placeholder='请输入标题'/>
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder='请输入描述'/>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder='请输入css样式代码... '/>
      </Form.Item>
      <Form.Item label="脚本代码" name="css">
        <TextArea placeholder='请输入脚本代码... '/>
      </Form.Item>
    </Form>
  )
}
export default PageSetting;