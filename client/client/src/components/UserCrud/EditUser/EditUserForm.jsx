/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Modal, Form, Input, Button, Space, Divider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editUser, selectUser } from "../../../store/UserCrudSlice/UserCrudSlice";
import { useEffect } from "react";

const EditUserForm = ({ visible, onCancel, store }) => {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();

/*   const store = useSelector((state) => state.UserCrudSlice.selectedUser); */

  const handleEdit = (id, values) => {
    const userWithId = {...values, id}

    console.log(userWithId)
    dispatch(editUser(id, userWithId));
    onCancel();
  }

  useEffect(() => {}, [])

  const onFinish = (values) => {
    editForm.resetFields(); // Reinicia los campos del formulario después de enviar
    console.log(store.id, values)
    handleEdit(store.id, values); // Pasa los valores del formulario a la función onCreate
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
      title="Editar Usuario"
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={() => editForm.submit()}>
          Editar Usuario
        </Button>,
      ]}
    >
      <Divider />
      <Form
        form={editForm}
        layout="vertical"
        name="add_user_form"
        onFinish={onFinish}
        onFinishFailed={() => dispatch(selectUser({}))}
      >
        <Space direction="vertical" size="large" style={{ marginLeft: "30px" }}>
          <Form.Item
            name="username"
            label="Usuario"
            initialValue={store?.username}
            rules={[
              { required: true, message: "Por favor ingresa el usuario" },
              { whitespace: true, message: "El usuario no puede estar vacío" },
            ]}
          >
            <Input size="medium" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombre"
            initialValue={store?.name}
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
            initialValue={store?.status}
            rules={[{ required: true, message: "Por favor ingresa el estado" }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Space>

        <Space direction="vertical" size="large" style={{ marginLeft: "30px" }}>
          <Form.Item
            name="email"
            label="Email"
            initialValue={store?.email}
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
            initialValue={store?.lastname}
            rules={[
              { required: true, message: "Por favor ingresa el apellido" },
              { whitespace: true, message: "El apellido no puede estar vacío" },
            ]}
          >
            <Input size="medium" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Edad"
            initialValue={store?.age}
            rules={[
              { required: true, message: "Por favor ingresa la edad" },
              { validator: validateAge },
            ]}
          >
            <Input type="number" size="medium" />
          </Form.Item>
        </Space>
      </Form>
      <Divider />
    </Modal>
  );
};

export default EditUserForm;
