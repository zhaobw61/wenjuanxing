export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProp: QuestionInputPropsType) => void
  disabled?: boolean
}

export const QuestionInputDefalutProps: QuestionInputPropsType = {
  title: '请输入标题',
  placeholder: '请输入...'
}