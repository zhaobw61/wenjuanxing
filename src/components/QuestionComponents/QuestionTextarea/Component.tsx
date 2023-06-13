import React, { FC } from 'react'
import { QuestionTextAreaDefalutProps, QuestionTextAreaPropsType } from "./interface";
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  const { title, placeholder } = {...QuestionTextAreaDefalutProps, ...props};
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionTextArea;
