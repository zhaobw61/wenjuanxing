import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { 
  removeSelectedComponent, 
  changeComponentHidden, 
  toggleComponentLocked, 
  copySelectedComponent,
  pasteCopiedComponent
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {};

  function handDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({fe_id: selectedId, isHidden: true}))
  }
  function handleLock() {
    dispatch(toggleComponentLocked({fe_id: selectedId}))
  }
  function handleCopy() {
    dispatch(copySelectedComponent())
  }
  function handlepaste() {
    dispatch(pasteCopiedComponent())
  }
  return <Space>
    <Tooltip title="删除">
      <Button shape="circle" icon={<DeleteOutlined/>} onClick={handDelete}></Button>
    </Tooltip>
    <Tooltip title="隐藏">
      <Button shape="circle" icon={<EyeInvisibleOutlined/>} onClick={handleHidden}></Button>
    </Tooltip>
    <Tooltip title="锁定">
      <Button shape="circle" icon={<LockOutlined/>} onClick={handleLock}
        type={isLocked ? 'primary' : 'default'}
      ></Button>
    </Tooltip>
    <Tooltip title="复制">
      <Button shape="circle" icon={<CopyOutlined/>} onClick={handleCopy}></Button>
    </Tooltip>
    <Tooltip title="复制">
      <Button shape="circle" icon={<CopyOutlined/>} onClick={handleCopy}></Button>
    </Tooltip>
    <Tooltip title="粘贴">
      <Button shape="circle" icon={<BlockOutlined/>} onClick={handlepaste} disabled={copiedComponent == null}></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar