import type { FC } from 'react';
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput/index";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const ComponentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf]
  }
]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(c => c.type === type)
}