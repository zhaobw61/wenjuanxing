import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface'

const { Paragraph } = Typography


const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter } = {...QuestionParagraphDefaultProps, ...props};

  const t = text.replaceAll('\n', '<br>')
  
  return (
    <Paragraph style={{textAlign: isCenter ? 'center' : 'start', marginBottom: '0'}} >
      <span dangerouslySetInnerHTML={{__html: t}}></span>
    </Paragraph>
  )
}

export default Component;
