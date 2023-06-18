import Component from "./Component"
import PropComponent from "./PropComponent"
import { QuestionCheckboxDefaultProps } from "./interface"

export * from './interface'

const obj = {
  title: "多选",
  type: "questionCheckbox",
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
}
export default obj
