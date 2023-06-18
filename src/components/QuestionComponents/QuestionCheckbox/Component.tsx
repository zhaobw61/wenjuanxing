import React, { FC } from 'react'
import { Typography, Checkbox, Space } from "antd"
import { QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from "./interface"
const { Paragraph } = Typography

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props };
  return <div>
    <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : "horizontal"}>
        {
          list.map(opt => {
            const { value, text, checked } = opt;
            return <Checkbox key={value} value={value} checked={checked}>{text}</Checkbox>
          })
        }
      </Space>
  </div>  
}

export default Component