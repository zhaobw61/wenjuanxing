import { DeleteOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeSelectedComponent, changeComponentHidden } from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId } = useGetComponentInfo()

  function handDelete() {
    dispatch(removeSelectedComponent())
  }
  function handleHidden() {
    dispatch(changeComponentHidden({fe_id: selectedId, isHidden: true}))
  }
  return <Space>
    <Tooltip title="删除">
      <Button shape="circle" icon={<DeleteOutlined/>} onClick={handDelete}></Button>
    </Tooltip>
    <Tooltip title="隐藏">
      <Button shape="circle" icon={<EyeInvisibleOutlined/>} onClick={handleHidden}></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar