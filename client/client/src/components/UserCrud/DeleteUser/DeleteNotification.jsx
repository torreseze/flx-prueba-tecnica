/* eslint-disable react/prop-types */
import { Button, Divider, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../store/UserCrudSlice/UserCrudSlice";
import { useState } from "react";
import Spinner from "../../Spinner";

const DeleteNotification = ({ open, onCancel }) => {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const store = useSelector(state => state.UserCrudSlice.selectedUser)

  const handleDelete = () => {
    setLoading(true)
    setTimeout(() => {
      dispatch(deleteUser(store.id))
      setLoading(false)
      onCancel();
    }, 700)
    
  }

  return (
    <Modal 
      open={open} 
      className='notification-delete'
      title="Eliminar usuario" 
      onCancel={onCancel}
      footer={[
        <Button key="cancel" type="default" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="delete" type="primary" style={{ background: '#E23336' }} onClick={handleDelete}>
        Eliminar
      </Button>
      ]}
      >
      <Divider />
      {loading ? <Spinner/> : <p style={{ fontWeight: '400', fontSize: '14px', lineHeight:'22px'}}>
        ¿Está seguro que quiere eliminar el usuario
        <span style={{ color: "#E23336" }}> @{store?.username}</span>?
      </p>}
      <Divider />
    </Modal>
  );
};

export default DeleteNotification;
