/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Modal, Form, Input, Button, Space, Divider, Select } from "antd";

const EditUserForm = ({ visible, onCancel, onCreate, userData }) => {
  const [editForm] = Form.useForm();

  const onFinish = (values) => {
    console.log("Formulario enviado:", values);
    editForm.resetFields(); // Reinicia los campos del formulario después de enviar
    /* onCreate(values); // Pasa los valores del formulario a la función onCreate */
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
      >
        <Space direction="vertical" size="large" style={{ marginLeft: "30px" }}>
          <Form.Item
            name="usuario"
            label="Usuario"
            initialValue={userData?.username}
            rules={[
              { required: true, message: "Por favor ingresa el usuario" },
              { whitespace: true, message: "El usuario no puede estar vacío" },
            ]}
          >
            <Input size="medium" />
          </Form.Item>
          <Form.Item
            name="nombre"
            label="Nombre"
            initialValue={userData?.name}
            rules={[
              { required: true, message: "Por favor ingresa el nombre" },
              { whitespace: true, message: "El nombre no puede estar vacío" },
            ]}
          >
            <Input size="medium" />
          </Form.Item>
          <Form.Item
            name="estado"
            label="Estado"
            initialValue={userData?.status}
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
            initialValue={userData?.email}
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
            name="apellido"
            label="Apellido"
            initialValue={userData?.lastname}
            rules={[
              { required: true, message: "Por favor ingresa el apellido" },
              { whitespace: true, message: "El apellido no puede estar vacío" },
            ]}
          >
            <Input size="medium" />
          </Form.Item>

          <Form.Item
            name="edad"
            label="Edad"
            initialValue={userData?.age}
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
