import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeSelectedComponent } from "../../../store/componentsReducer";

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  function handDelete() {
    dispatch(removeSelectedComponent())
  }
  return <Space>
    <Tooltip title="删除">
      <Button shape="circle" icon={<DeleteOutlined/>} onClick={handDelete}></Button>
    </Tooltip>
  </Space>
}

export default EditToolbar