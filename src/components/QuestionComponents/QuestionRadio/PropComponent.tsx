import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { QuestionRadioPropsType, OptionType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options=[], onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({title, isVertical, value, options})
  }, [title, isVertical, value, options])

  function handleValuesChange(){
    if(onChange == null) return
    // onChange();
    const newValues = form.getFieldsValue() as QuestionRadioPropsType ;
    const { options = [] } = newValues
    options.forEach(opt => {
      if(opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return <Form
    layout='vertical'
    initialValues={{title, isVertical, value, options}}
    onValuesChange={handleValuesChange}
    disabled={disabled}
    form = {form}
  >
    <Form.Item label="标题" name="title" rules={[{ required: true, message:"请输入标题" }]}>
      <Input />
    </Form.Item>
    <Form.Item label="选项">
      <Form.List name="options">
        {(fields, { add,  remove}) => (<>
          {fields.map(({key, name}, index) => {
            return <Space key={key} align="baseline">

              <Form.Item
                name={[name, 'text']}
                rules={[
                  {required: true, message: '请输入选项文字'},
                  {
                    validator: (_, text) => {
                      const { options = [] } = form.getFieldsValue()
                      let num = 0
                      options.forEach((opt: OptionType) => {
                        if(opt.text === text ) num++
                      })
                      if(num === 1) return Promise.resolve();
                      return Promise.reject(new Error('和其他选项重复了'))
                    }
                  }
                ]}
              >
                <Input placeholder='请输入选项文字...' />
              </Form.Item>
              {/* 删除按钮 */}
              {index > 1 && <MinusCircleOutlined onClick={() => {
                remove(name)
              }}/>}
            </Space>
          })}
          <Form.Item>
            <Button type="link" onClick={() => add({text: '', value: ''})} icon={<PlusOutlined/>}>添加选项</Button>
          </Form.Item>
        </>)}
      </Form.List>
    </Form.Item>
    <Form.Item label="默认选中" name="value">
      <Select value={value} options={options.map(({text, value}) => ({value, label: text || ''}))}></Select>
    </Form.Item>
    <Form.Item name="isVertical" valuePropName="checked">
      <Checkbox>居中显示</Checkbox>
    </Form.Item>
  </Form>
}

export default PropComponent;
