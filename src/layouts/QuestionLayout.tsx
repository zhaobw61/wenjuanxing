import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData';
import { Spin } from 'antd';

export default function QuestionLayout() {
  const { waitingUserData } = useLoadUserData();
  return (
    <div>
      <p>question Layout</p>
      <div>
        { waitingUserData ?(
            <div style={{textAlign: 'center', marginTop: '60px'}}>
              <Spin/>
            </div>
          ) : <Outlet /> }
      </div>
    </div>
  )
}
