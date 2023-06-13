//  问卷 info 组件 
import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInfoDefaultProps } from './interface';


export * from './interface';

const obj = {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps
}

export default obj