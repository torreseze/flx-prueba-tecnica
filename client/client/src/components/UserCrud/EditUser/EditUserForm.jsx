/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* 
import { Modal, Form, Input, Button, Space, Divider, Select } from "antd"; */

import { Modal, Input, Button, Space, Divider, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getUsersList,
} from "../../../store/UserCrudSlice/UserCrudSlice";
import { useEffect, useState } from "react";
import { putUser } from "../../../services/UserCrudServices";
import Spinner from "../../Spinner";

const EditUserForm = ({ visible, onCancel }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.UserCrudSlice.selectedUser);
  const [userData, setUserData] = useState({
    username: store?.username || "",
    name: store?.name || "",
    status: store?.status || "",
    email: store?.email || "",
    lastname: store?.lastname || "",
    age: store?.age || ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleChange = (fieldName, value) => {
    setUserData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
    setFormErrors(prevState => ({
      ...prevState,
      [fieldName]: '' // Borrar el mensaje de error cuando se cambia el valor del campo
    }));
  };

  useEffect(() => {
    // Resetear los campos cuando el formulario se monta o cuando cambia el usuario seleccionado
    setUserData({
      username: store?.username || "",
      name: store?.name || "",
      status: store?.status || "",
      email: store?.email || "",
      lastname: store?.lastname || "",
      age: store?.age || ""
    });
  }, [store]);

  const handleEdit = async () => {
    const errors = {}; // Objeto para almacenar los errores

    // Validar cada campo del formulario
    if (!userData.username || !userData.username.trim()) {
      errors.username = 'El nombre de usuario es requerido';
    }
    if (!userData.name || !userData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    if (!userData.email || !userData.email.trim() || !emailRegex.test(userData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
    }
    if (!userData.lastname || !userData.lastname.trim()) {
      errors.lastname = 'El apellido es requerido';
    }
    if (userData.age < 0 || userData.age === '') {
      errors.age = 'La edad debe ser un número válido';
    }

    // Si no hay errores, enviar los datos del usuario
    if (Object.keys(errors).length === 0) {
      setLoading(true)
      setTimeout(async () => {
        await putUser(store.id, userData);
        dispatch(getUsersList());
        setLoading(false)
        onCancel();
      }, 700);
    } else {
      // Si hay errores, actualizar el estado de los errores del formulario
      setFormErrors(errors);
    }
  };


  return (
    <Modal
      open={visible}
      title="Editar Usuario"
      onCancel={onCancel}
      width={572}
      footer={[
        <Button key="submit" type="primary" onClick={handleEdit}>
          Editar Usuario
        </Button>,
      ]}
    >
      <Divider />
      {loading? <Spinner/> : <Space  size="large" style={{ width: "100%", display: 'flex', justifyContent:'center', alignItems:'center' }}>
        <Space direction="vertical" size='middle' >
          <label className="label-form" htmlFor="username">Usuario</label>
          <Input
            id="username"
            placeholder="Usuario"
            value={userData.username}
            status={formErrors.username? 'error' : ''}
            onChange={(e) =>
              handleChange('username', e.target.value)
            }
            style={{ width: 200 }}
            size="medium"
          />

          {formErrors.username && <p style={{ color: 'red' }}>Ingrese un valor válido</p>}

          <label className="label-form" htmlFor="name">Nombre</label>
          <Input
            id="name"
            placeholder="Nombre"
            value={userData.name}
            status={formErrors.name? 'error' : ''}
            onChange={(e) =>handleChange( 'name', e.target.value)}
            style={{ width: 200 }}
            size="medium"
          />
          {formErrors.name && <p style={{ color: 'red' }}>Ingrese un valor válido</p>}

          <label className="label-form" htmlFor="status">Estado</label>
          <Select
            id="status"
            placeholder="Estado"
            value={userData.status}
            onChange={(value) => setUserData({ ...userData, status: value })}
            style={{ width: 200 }}
            size="medium"
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
          
        </Space>
        <Space direction="vertical" size= 'middle'>
          <label className="label-form" htmlFor="email">Email</label>
          <Input
            id="email"
            placeholder="Email"
            value={userData.email}
            status={formErrors.editUser? 'error' : ''}
            onChange={(e) =>
             handleChange( 'email', e.target.value)
            }
            style={{ width: 200 }}
            size="medium"
          />
          {formErrors.email && <p style={{ color: 'red' }}>Ingrese un mail válido</p>}

          <label className="label-form" htmlFor="lastname">Apellido</label>
          <Input
            id="lastname"
            placeholder="Apellido"
            value={userData.lastname}
            status={formErrors.lastname? 'error' : ''}
            onChange={(e) =>
              handleChange('lastname', e.target.value)
            }
            style={{ width: 200 }}
            size="medium"
          />
          {formErrors.lastname && <p style={{ color: 'red' }}>Ingrese un valor válido</p>}

          <label className="label-form" htmlFor="age">Edad</label>
          <Input
            id="age"
            placeholder="Edad"
            type="number"
            value={userData.age}
            status={formErrors.age? 'error' : ''}
            onChange={(e) => handleChange('age', e.target.value)}
            style={{ width: 200 }}
            size="medium"
          />
          {formErrors.age && <p style={{ color: 'red' }}>Ingrese un edad válida</p>}
        </Space>
      </Space>}
      
      <Divider />
    </Modal>
  );
};

export default EditUserForm;
