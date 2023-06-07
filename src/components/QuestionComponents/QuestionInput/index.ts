/**
 * @description 问卷输入框
 * 
 */

import Component from "./Component";
import { QuestionInputDefalutProps } from "./interface";
import PropComponent from "./PropComponent";

export * from './interface';

const obj = {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent,
  defaultProps: QuestionInputDefalutProps
}

export default obj