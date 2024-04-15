/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Modal, Form, Input, Button, Space, Divider, Select, Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import {
  createUser,
  getUsersList,
} from "../../../store/UserCrudSlice/UserCrudSlice";
import { useState } from "react";
import Spinner from "../../Spinner";

const AddUserForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddUser = (userData) => {
    const id = uuidv4();
    const userDataWithId = { ...userData, id };
    dispatch(createUser(userDataWithId));
    dispatch(getUsersList());
  };

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      form.resetFields(); // Reinicia los campos del formulario después de enviar
      handleAddUser(values); //
      
      setLoading(false);
    }, 500);
  };

  const validateAge = (_, value) => {
    if (value < 0) {
      return Promise.reject("La edad no puede ser menor a 0");
    }
    return Promise.resolve();
  };

  return (
    <Modal
      open={visible}
      title="Agregar Usuario"
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Agregar Usuario
        </Button>,
      ]}
    >
      <Divider />
      {loading ? (
        <Spinner />
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="add_user_form"
          onFinish={onFinish}
        >
          <Space
            direction="vertical"
            size="large"
            style={{ marginLeft: "30px" }}
          >
            <Form.Item
              name="username"
              label="Usuario"
              rules={[
                { required: true, message: "Por favor ingresa el usuario" },
                {
                  whitespace: true,
                  message: "El usuario no puede estar vacío",
                },
              ]}
            >
              <Input size="medium" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: "Por favor ingresa el nombre" },
                { whitespace: true, message: "El nombre no puede estar vacío" },
              ]}
            >
              <Input size="medium" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Estado"
              rules={[
                { required: true, message: "Por favor ingresa el estado" },
              ]}
            >
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Space>

          <Space
            direction="vertical"
            size="large"
            style={{ marginLeft: "30px" }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Por favor ingresa el email" },
                {
                  type: "email",
                  message: "Ingresa un correo electrónico válido",
                },
                { whitespace: true, message: "El email no puede estar vacío" },
              ]}
            >
              <Input type="email" size="medium" />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[
                { required: true, message: "Por favor ingresa el apellido" },
                {
                  whitespace: true,
                  message: "El apellido no puede estar vacío",
                },
              ]}
            >
              <Input size="medium" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Edad"
              rules={[
                { required: true, message: "Por favor ingresa la edad" },
                { validator: validateAge },
              ]}
            >
              <Input type="number" size="medium" />
            </Form.Item>
          </Space>
        </Form>
      )}
      <Divider />
    </Modal>
  );
};

export default AddUserForm;
