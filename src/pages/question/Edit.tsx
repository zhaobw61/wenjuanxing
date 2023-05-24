import React, { useEffect } from 'react'
import { getQuestionService } from '../../services/question'
import { useParams } from 'react-router-dom'

export default function Edit() {
  const { id = '' } = useParams();
  useEffect(() => {
    async function fn () {
      const data = await getQuestionService(id)
      console.log(data)
    }
    fn()
  }, [])
  return (
    <div>Edit</div>
  )
}
