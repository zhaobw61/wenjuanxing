import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoDefaultProps, QuestionInfoPropsType }  from './interface';

const { Title, Paragraph }  = Typography

const Component: FC<QuestionInfoPropsType> = (props:QuestionInfoPropsType) => {
  const { title, desc ="" } = {...QuestionInfoDefaultProps, ...props }
  const t = desc.replaceAll('\n', '<br>')
  return <div style={{textAlign:'center'}}>
    <Title style={{fontSize: '24px'}}>{title}</Title>
    <Paragraph>{t}</Paragraph>
  </div>
}

export default Component;