import React from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

export default function Stat() {
  const { loading, data  } = useLoadQuestionData();
  return (
    <div>
      { loading ? <div>loading</div> : <div>Stat</div> }
    </div>
  )
}
