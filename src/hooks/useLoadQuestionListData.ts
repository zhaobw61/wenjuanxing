import { useRequest } from 'ahooks';
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";

type OptionType ={
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt;
  const [ searchParams ] = useSearchParams();
  const {data, loading, error } = useRequest(async ()=> {
    const keyword = searchParams.get('keyword') || '';

    const data = await getQuestionListService({keyword, isStar, isDeleted})
    return data;
  },{
    refreshDeps: [searchParams] // 刷新的依赖项
  })
  
  return { data, loading, error }
}

export default useLoadQuestionListData