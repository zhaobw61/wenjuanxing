/**
 * @description 问卷 标题
 * 
 */

import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";

export * from './interface';

const obj = {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps
}

export default obj