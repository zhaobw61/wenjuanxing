import { getQuestionService } from "../services/question";
import { useParams } from "react-router-dom";
import { useRequest } from 'ahooks';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer/index";
import { resetPageInfo } from "../store/pageInfoReducer";

function useLoadQuestionData(){
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(async (id:string) => {
    if(!id) throw new Error("no id");
    const data = await getQuestionService(id)
    return data;
  },{
    manual: true
  })

  useEffect(() => {
    if(!data) return;

    const { title = '', desc = '', js = '', css = '', componentList = [] } = data;
    let selectedId = ''
    if(componentList.length) {
      selectedId = componentList[0].fe_id
    }
    // componentList 存储到 Redux store中
    dispatch(resetComponents({componentList, selectedId}))
    // pageInfo 存储到 Redux store中
    dispatch(resetPageInfo({title, desc, js, css}))
  }, [data])
  
  useEffect(() => {
    run(id)
  }, [id])
  
  return { loading, error }
}

export default useLoadQuestionData;
