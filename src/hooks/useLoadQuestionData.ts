import { useEffect, useState } from "react";
import { getQuestionService } from "../services/question";
import { useParams } from "react-router-dom";

function useLoadQuestionData(){
  const { id = '' } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionData, setQuesiotnData] = useState({})

  useEffect(() => {
    async function fn () {
      const data = await getQuestionService(id)
      setQuesiotnData(data);
      setLoading(false);
    }
    fn()
  }, [])
  return { loading, questionData }
}

export default useLoadQuestionData;
