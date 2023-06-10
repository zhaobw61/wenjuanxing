import React, { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'
import { Form, Input, Checkbox, Select } from 'antd';


const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter})
  }, [ text, level, isCenter])

  function handleValuesChange() {
    if(onChange) {
      onChange(form.getFieldsValue())
    }
  }



  return <Form
    form = {form}
    layout="vertical"
    onValuesChange={handleValuesChange}
    initialValues={{ text, level, isCenter}}
    disabled = {disabled}
  >
    <Form.Item label="标题内容" name="text" rules={[{ required: true, message: '请输入标题内容' }]}>
      <Input />
    </Form.Item>
    <Form.Item label="层级" name="level">
      <Select options={[
        {value: 1, text: 1},
        {value: 2, text: 2},
        {value: 3, text: 3}
      ]}></Select>
    </Form.Item>
    <Form.Item label="isCenter" valuePropName='checked'>
      <Checkbox>剧中显示</Checkbox>
    </Form.Item>
  </Form>
}
export default PropComponent