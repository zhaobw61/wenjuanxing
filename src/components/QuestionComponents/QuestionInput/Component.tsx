import React, { FC } from 'react'
import { QuestionInputDefalutProps, QuestionInputPropsType } from "./interface";
import { Typography, Input } from 'antd';

const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = {...QuestionInputDefalutProps, ...props};
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput;
