/**
 * @description 问卷输入框
 * 
 */

import Component from "./Component";
import { QuestionTextAreaDefalutProps } from "./interface";
import PropComponent from "./PropComponent";

export * from './interface';

const obj = {
  title: '多行输入',
  type: 'questionTextArea',
  Component,
  PropComponent,
  defaultProps: QuestionTextAreaDefalutProps
}

export default obj