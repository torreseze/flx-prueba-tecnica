/* eslint-disable no-unused-vars */

import { Space, Table, Tag } from "antd";
import { useState } from "react";
import DeleteNotification from "../DeleteUser/DeleteNotification";
import EditUserForm from "../EditUser/EditUserForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/UserCrudSlice/UserCrudSlice";

const UserList = () => {

  const [openEditModal , setOpenEditModal] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false)

  const dispatch = useDispatch()

  const store = useSelector(state => state.UserCrudSlice)

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      width: 285
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: 285
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      width: 285
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_, { status }) => (
        <>
          {
            <Tag
              style={{
                background: status === "active" ? "#f6ffed" : "#fff1f0",
                color: status === "active" ? "#52C41A" : "#F5222D",
                borderColor: status === "active" ? "#52C41A" : "#F5222D"
              }}
            >
              {status?.toUpperCase()}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      width: 150,
  
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleOpenEditForm(record)}>Editar</a>
          <a onClick={() => handleOpenDeleteNotification(record)}>
            Eliminar
          </a>
        </Space>
      ),
    },
  ];

  const handleOpenEditForm = (record) => {
    dispatch(selectUser(record))
    setOpenEditModal(true)
  }

  const handleCancel = () => {
    dispatch(selectUser({}))
    setOpenEditModal(false);
  }

  const handleOpenDeleteNotification = (record) => {
    dispatch(selectUser(record))
    setOpenDeleteNotification(true)
  }
  const handleCancelDelete =() => {
    dispatch(selectUser({}))
    setOpenDeleteNotification(false)
  }

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={store.users || []} 
        rowKey={record => record.id} 
         
      />
      <EditUserForm visible={openEditModal} store={store.selectedUser} onCancel={handleCancel} />
      <DeleteNotification open={openDeleteNotification} onCancel={handleCancelDelete} />
    </>
  );
};

export default UserList;
