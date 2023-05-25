import React, { useEffect, useState } from 'react'
import { getQuestionService } from '../../../services/question'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

export default function Edit() {
  const {loading, data} = useLoadQuestionData();
  return (
    <div>
      <p>Edit page</p>
      <div>
        { loading ? <div>loading</div> : <div>{JSON.stringify(data)}</div>}
      </div>
    </div>
  )
}
