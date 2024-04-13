/* eslint-disable no-unused-vars */

import { Space, Table, Tag } from "antd";
import { useState } from "react";
import DeleteNotification from "../DeleteUser/DeleteNotification";
import EditUserForm from "../EditUser/EditUserForm";

const dummy = [
  {
   
    id: 1,
    username: "user1",
    name: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    status: "active",
    age: 30,
  },
  {
   
    id: 2,
    username: "user2",
    name: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    status: "inactive",
    age: 25,
  },
  {
    
    id: 3,
    username: "user3",
    name: "Michael",
    lastname: "Johnson",
    email: "michael.johnson@example.com",
    status: "active",
    age: 35,
  },
];


const UserList = () => {

  const [open , setOpen] = useState(false);
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false)
  const [userData, setUserData] = useState([]);

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {
            <Tag
              style={{
                background: status === "active" ? "#f6ffed" : "#fff1f0",
                color: status === "active" ? "#52C41A" : "#F5222D",
                borderColor: status === "active" ? "#52C41A" : "#F5222D",
              }}
            >
              {status.toUpperCase()}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Acciones",
      key: "action",
  
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
   setUserData(record)
   setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleOpenDeleteNotification = (record) => {
    setUserData(record)
    setOpenDeleteNotification(true)
  }
  const handleCancelDelete =() => {
    setOpenDeleteNotification(false)
  }

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={dummy} 
        rowKey={record => record.id} 
         
      />
      <EditUserForm visible={open} userData={userData} onCancel={handleCancel} />
      <DeleteNotification open={openDeleteNotification} userData={userData} onCancel={handleCancelDelete} />
    </>
  );
};

export default UserList;
