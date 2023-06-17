import Component from "./Component"
import PropComponent from "./PropComponent"
import { QuestionRadioDefaultProps } from "./interface"

export * from './interface'

const obj = {
  title: "单选",
  type: "questionadio",
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps
}
export default obj
