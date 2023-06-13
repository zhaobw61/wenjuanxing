export type QuestionTextAreaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProp: QuestionTextAreaPropsType) => void
  disabled?: boolean
}

export const QuestionTextAreaDefalutProps: QuestionTextAreaPropsType = {
  title: '请输入标题',
  placeholder: '请输入...'
}