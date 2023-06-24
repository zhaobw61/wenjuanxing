import react, { ChangeEvent, FC, useState } from 'react'
import classNames from  'classnames'
import { Button, Input, Space, message } from 'antd'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeSelectedId, changeComponentTitle, toggleComponentLocked, changeComponentHidden } from '../../../store/componentsReducer'
import styles from './Layers.module.scss'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

// const 
const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  // 记录当前正在修改的标题组件
  const [ changingTitleId, setChangingTitleId ] = useState('')
  
  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if(curComp && curComp.isHidden) {
      message.info('不能选择隐藏中的组件')
      return
    }
    if(fe_id !== selectedId) {
      // 执行选择中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('');
      return;
    }
    setChangingTitleId(fe_id)
  }
  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if(!newTitle) return
    if(!selectedId) return
    dispatch(changeComponentTitle({fe_id: selectedId, title: newTitle}))
  }
  // 切换/ 隐藏/ 显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({fe_id, isHidden}))
  }
  // 锁定和解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({fe_id}))
  }
  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c;

        // 拼接 title className
        const titleDefaultClassName = styles.title
        const SelectedClassName = styles.selected
        const titleClassName  = classNames({
          [titleDefaultClassName]: true,
          [SelectedClassName]: fe_id === selectedId
        })
        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId && <Input value={title}
                onChange={changeTitle}
                onPressEnter={() => {
                  setChangingTitleId('')
                }} 
                onBlur={() =>{
                  setChangingTitleId('')
                }}
              />}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button 
                  size='small'
                  shape='circle'
                  className={isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined/>}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id, !isHidden )}
                />
                <Button
                  size='small'
                  shape='circle'
                  className={isLocked ? styles.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers