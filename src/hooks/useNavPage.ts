import { useEffect } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { isLoginOrRegister, isNoNeedUserInfo, LOGIN_PATHNAME, MANAGR_INDEX_PATHNAME } from '../router/index'
import { useLocation, useNavigate } from 'react-router-dom';

  function useNavPage(waitingUserData: boolean) {
    const { userName } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()
    useEffect(() => {
      if (waitingUserData) return
      if (userName) {
        if (isLoginOrRegister(pathname)) {
          nav(MANAGR_INDEX_PATHNAME)
        }
        return
      }
      // 未登录
      if(isNoNeedUserInfo(pathname)) {
        return
      } else {
        nav(LOGIN_PATHNAME)
      }
    }, [userName, pathname])
  }

export default useNavPage;