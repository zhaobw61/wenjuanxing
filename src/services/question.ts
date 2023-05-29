import axios, { ResDataType } from "./ajax";
// import type { ResDataType } from './ajax';

type SearchOptions = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷的信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = '/api/question/:id';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question/';
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 获取（查询）问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOptions> = {}
): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data;
}
// 更新单个问卷
export async function updateQuestionService(id: string, opt: { [key: string]:any  }) {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data;
}
// 复制问卷
export async function duplicateQuestionService(id: string) {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data;
}


