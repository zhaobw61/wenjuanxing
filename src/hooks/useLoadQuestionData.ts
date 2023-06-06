import { getQuestionService } from "../services/question";
import { useParams } from "react-router-dom";
import { useRequest } from 'ahooks';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer/index";

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

    const { title = '', componentList = [] } = data;

    dispatch(resetComponents({componentList}))
  }, [data])
  
  useEffect(() => {
    run(id)
  }, [id])
  
  return { loading, error }
}

export default useLoadQuestionData;
