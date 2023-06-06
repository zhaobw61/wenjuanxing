/**
 * @description 问卷输入框
 * 
 */

import Component from "./Component";
import { QuestionInputDefalutProps } from "./interface";

export * from './interface';

const obj = {
  title: '输入框',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputDefalutProps
}

export default obj