import { useRequest } from 'ahooks';
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../services/question";

function useLoadQuestionListData() {
  const [ searchParams ] = useSearchParams();
  const {data, loading, error } = useRequest(async ()=> {
    const keyword = searchParams.get('keyword') || '';

    const data = await getQuestionListService({keyword})
    return data;
  },{
    refreshDeps: [searchParams] // 刷新的依赖项
  })
  
  return { data, loading, error }
}

export default useLoadQuestionListData